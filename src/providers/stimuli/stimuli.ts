import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant } from '../../models/participant';
import { TESTS_ORDER, CONDITIONS, CONDITIONS_ACTIVE_ONLY } from './constants';
import { AppInfo } from './app-info';

@Injectable()
export class Stimuli {

  appInfo: AppInfo = AppInfo;

  public langChangedEvent: EventEmitter<string> = new EventEmitter();

  activeOnlyVersion: boolean;
  onlineVersion: boolean = false;
  
  conditionIndex: number;
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

  constructor(private utils: Utils, private platform: Platform) {
    console.log('Hello Stimuli Provider');
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.runInBrowser = this.platform.is('core') || this.platform.is('mobileweb');

    this.detectOnlineVersion();
  }

  initialize() {
    this.initialTimestamp = Date.now();
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.currentTestIndex = -1;
  }

  detectOnlineVersion() {
    console.log(document.location.search);
    const params = new URLSearchParams(document.location.search);
    console.log("params", params)
  }

  initializeConditions(isActiveOnly: boolean = false) {
    this.activeOnlyVersion = isActiveOnly;
    this.pickCondition();
    this.pickFeaturesOrder();
  }

  pickCondition() {
    let counter = 0;
    if (this.conditionCounterOverride != null) {
      console.log("conditionCounterOverride", this.conditionCounterOverride);
      counter = this.conditionCounterOverride;
    }
    else {
      counter = this.utils.getCounterValue();
      //TODO: move to the data saving 
      this.utils.incrementCounter();
    }

    let condition = CONDITIONS[counter % CONDITIONS.length];

    if (this.activeOnlyVersion) {
      condition = CONDITIONS_ACTIVE_ONLY[counter % CONDITIONS_ACTIVE_ONLY.length];
      this.conditionIndex = counter % CONDITIONS_ACTIVE_ONLY.length;
    }
    else {
      this.conditionIndex = counter % CONDITIONS.length;
    }
      
    this.trainingType = condition.training;
    this.testTypes = TESTS_ORDER[condition.testingOrder];

    this.criterionFunctionIndex = condition.func;
    this.trainingTasksNuber = condition.trainingTasks;
    
    console.log("[trainingType]", this.trainingType);
    console.log("[testTypes]", this.testTypes);
  }

  pickFeaturesOrder() {
    let perms = this.utils.permute(["feature_a", "feature_b", "feature_c"]);
    this.featuresOrder = this.utils.pickRandomFromArray(perms);
    console.log("[featuresOrder]", this.featuresOrder);
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

  // TODO: function 2
  criterionFunction2(feature_a: number, feature_b: number, feature_c: number): number {
    const features = {
      "feature_a": feature_a,
      "feature_b": feature_b,
      "feature_c": feature_c
    };
    const x = features[this.featuresOrder[0]];
    const y = features[this.featuresOrder[1]];
    const z = features[this.featuresOrder[2]];
    return x + y + z;
  }



  

  parseUrlParams_old() {
    let codeProvided = false;
    if (document.URL.indexOf("?") > 0) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      let i: any;
      for (i in splitParams) {
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == "uid") {
          this.participant.code = singleURLParam[1];
          codeProvided = true;
        }
        else if (singleURLParam[0] == "wid") {
          this.participant.code = singleURLParam[1];
          codeProvided = true;
        }
        else if (singleURLParam[0] == "age") {
          this.participant.age = parseInt(singleURLParam[1]);
        }
        else if (singleURLParam[0] == "grade") {
          this.participant.grade = parseInt(singleURLParam[1]);
        }
        else if (singleURLParam[0] == "cond") {
          this.conditionCounterOverride = parseInt(singleURLParam[1]);
          
          console.log("[param][conditionCounterOverride]", parseInt(singleURLParam[1]));
          console.log( this.conditionCounterOverride);
        }
      }
    }
    this.onlineVersion = codeProvided != false;
    return codeProvided;
  }

  getParticipantAgeGroup() {
    if (this.participant.age >= 18) return 18;
    return this.participant.age;
  }

  setLang(langCode: string) {
    this.langChangedEvent.emit(langCode);
  }

  hi() {
    
  }

}
