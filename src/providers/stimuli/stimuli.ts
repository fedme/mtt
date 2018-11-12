import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant } from '../../models/participant';
import { TESTS_ORDER, CONDITIONS, CONDITIONS_ACTIVE_ONLY, ONLINE_DEFAULT_CONDITION, CONDITIONS_EXTENDED } from './constants';
import { AppInfo } from './app-info';
import { Api } from '../api/api';

@Injectable()
export class Stimuli {

  appInfo: AppInfo = AppInfo;

  public langChangedEvent: EventEmitter<string> = new EventEmitter();
  lang: string = "en";

  activeOnlyVersion: boolean;

  // onlineVersion
  onlineVersion: boolean = false;
 
  conditionIndex: number;
  condition: { trainingTasks: number, func: number, training: string, testingOrder: number };
  criterionFunctionIndex: number;
  trainingTasksNuber: number;

  initialTimestamp: number;
  participant: Participant;
  featuresOrder: string[];
  trainingType: string;
  testTypes: string[];
  currentTestIndex: number = -1;
  runInBrowser: boolean = false;
  conditionCounterOverride: number = null;
  questionsCheck: any[] = [];
  questionsCheckCounter: number = 0;

  constructor(
    private utils: Utils, 
    private platform: Platform,
    private api: Api
    ) {

    //console.log('Hello Stimuli Provider');
    this.participant = new Participant("");
    this.runInBrowser = this.platform.is('core') || this.platform.is('mobileweb');

    if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != "") {
      this.lang = localStorage.getItem('lang')
    }
  }

  initialize() {
    this.initialTimestamp = Date.now();
    this.participant = new Participant("");
    this.currentTestIndex = -1;
  }

  public setCondition(nTraining: number, func: number, trainingType: string, testingOrder: number) {
    const condition = { 
      "trainingTasks": nTraining ? nTraining : ONLINE_DEFAULT_CONDITION.trainingTasks, 
      "func": func ? func : ONLINE_DEFAULT_CONDITION.func, 
      "training": trainingType ? trainingType : ONLINE_DEFAULT_CONDITION.training, 
      "testingOrder": testingOrder ? testingOrder : ONLINE_DEFAULT_CONDITION.testingOrder 
    }
    this.condition = condition;
  }

  async getConditionFromServer() {
    try {
      const res = await this.api.get('conditions/first').toPromise();
      const id: number = res ? res['data']['condition_id'] : 0;
      console.log('Got condition id from server:', id);
      this.condition = CONDITIONS_EXTENDED[id % CONDITIONS_EXTENDED.length];
    }
    catch(e) {
      console.log('ERROR in getting condition from server:', e);
      this.condition = CONDITIONS_EXTENDED[0];
    }
  }

  public setConditionById(id: number) {
    this.condition = CONDITIONS_EXTENDED[id % CONDITIONS_EXTENDED.length];
  }

  initializeConditions(isActiveOnly: boolean = false) {
    this.activeOnlyVersion = isActiveOnly;
    this.pickCondition();
    this.pickFeaturesOrder();
  }

  pickCondition() {

    let condition: { trainingTasks: number, func: number, training: string, testingOrder: number };

    if (this.condition != null) {
      condition = this.condition;
      console.log("[DEBUG] Using condition override", condition);
    }

    else {

      let counter = 0;

      if (this.conditionCounterOverride != null) {
        //console.log("conditionCounterOverride", this.conditionCounterOverride);
        counter = this.conditionCounterOverride;
      }
      else {
        counter = this.utils.getCounterValue();
        //TODO: move to the data saving 
        this.utils.incrementCounter();
      }

      condition = CONDITIONS[counter % CONDITIONS.length];

      if (this.activeOnlyVersion) {
        condition = CONDITIONS_ACTIVE_ONLY[counter % CONDITIONS_ACTIVE_ONLY.length];
        this.conditionIndex = counter % CONDITIONS_ACTIVE_ONLY.length;
      }
      else {
        this.conditionIndex = counter % CONDITIONS.length;
      }

    }

    this.condition = condition;
    this.trainingType = condition.training;
    this.testTypes = TESTS_ORDER[condition.testingOrder];

    this.criterionFunctionIndex = condition.func;
    this.trainingTasksNuber = condition.trainingTasks;

    //console.log("[trainingType]", this.trainingType);
    //console.log("[testTypes]", this.testTypes);
  }

  pickFeaturesOrder() {
    let perms = this.utils.permute(["feature_a", "feature_b", "feature_c"]);
    this.featuresOrder = this.utils.pickRandomFromArray(perms);
    //console.log("[DEBUG] Features Order]", this.featuresOrder);
  }

  isPassive() {
    return this.trainingType == "passive";
  }

  isActive() {
    return this.trainingType == "active";
  }

  getNextTestType() {
    this.currentTestIndex++;
    return this.testTypes[this.currentTestIndex];
  }

  runOutOfTests() {
    return this.currentTestIndex >= (this.testTypes.length - 1);
  }

  calculateCriterion(feature_a: number, feature_b: number, feature_c: number): number {
    if (this.criterionFunctionIndex == 1) {
      return this.criterionFunction1(feature_a, feature_b, feature_c);
    }
    if (this.criterionFunctionIndex == 2) {
      return this.criterionFunction2(feature_a, feature_b, feature_c);
    }

    return this.criterionFunction1(feature_a, feature_b, feature_c);
  }

  criterionFunction1(feature_a: number, feature_b: number, feature_c: number): number {
    const features = {
      "feature_a": feature_a,
      "feature_b": feature_b,
      "feature_c": feature_c
    };
    const x = features[this.featuresOrder[0]];
    const y = features[this.featuresOrder[1]];
    const z = features[this.featuresOrder[2]];
    return (6 * x) + (3 * y) + z - 10;
  }

  criterionFunction2(feature_a: number, feature_b: number, feature_c: number): number {
    const features = {
      "feature_a": feature_a,
      "feature_b": feature_b,
      "feature_c": feature_c
    };
    const x = features[this.featuresOrder[0]];
    const y = features[this.featuresOrder[1]];
    const z = features[this.featuresOrder[2]];
    return -x*x + 3*y + z + 21;
  }

  // TODO: age groups
  getParticipantAgeGroup(age: number): string {
    if (this.participant.age >= 18) return "18";
    return this.participant.age + "";
  }


  setLang(langCode: string) {
    this.langChangedEvent.emit(langCode);
  }

  hi() {

  }

}
