import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant } from '../../models/participant';
import { CONDITIONS, CONDITIONS_ACTIVE_ONLY } from './constants';

@Injectable()
export class Stimuli {

  public langChangedEvent: EventEmitter<string> = new EventEmitter();

  activeOnlyVersion: boolean;
  onlineVersion: boolean = false;
  
  conditionIndex: number;
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
  }

  initialize() {
    this.initialTimestamp = Date.now();
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.currentTestIndex = -1;
  }

  onAferRegistration(isActiveOnly: boolean = false) {
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

    let condition = null;

    if (this.activeOnlyVersion) {
      condition = CONDITIONS_ACTIVE_ONLY[counter % CONDITIONS_ACTIVE_ONLY.length];
      this.conditionIndex = counter % CONDITIONS_ACTIVE_ONLY.length;
    }
    else {
      condition = CONDITIONS[counter % CONDITIONS.length];
      this.conditionIndex = counter % CONDITIONS.length;
    }
      
    this.trainingType = condition.training;
    this.testTypes = condition.testing;
    
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

  calculateCriterion(feature_a: number, feature_b: number, feature_c: number) {
    let features = {
      "feature_a": feature_a,
      "feature_b": feature_b,
      "feature_c": feature_c
    };
    let x = features[this.featuresOrder[0]];
    let y = features[this.featuresOrder[1]];
    let z = features[this.featuresOrder[2]];
    return (6 * x) + (3 * y) + z - 10;
  }

  getParticipantAgeGroup() {
    if (this.participant.age >= 18) return 18;
    return this.participant.age;
  }

  setLang(langCode: string) {
    this.langChangedEvent.emit(langCode);
  }

}
