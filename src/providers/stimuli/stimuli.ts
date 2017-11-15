import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import { Participant } from '../../models/participant';
import { CONDITIONS } from './constants';

@Injectable()
export class Stimuli {

  initialTimestamp: number;
  participant: Participant;
  featuresOrder: string[];
  trainingType: string;
  testTypes: string[];
  currentTestIndex: number = -1;

  constructor(private utils: Utils) {
    console.log('Hello Stimuli Provider');
    this.initialTimestamp = Date.now();
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    this.pickCondition();
    this.pickFeaturesOrder();
    console.log("[featuresOrder]", this.featuresOrder);
    console.log("[trainingType]", this.trainingType);
    console.log("[testTypes]", this.testTypes);
  }

  pickCondition() {
    let counter = this.utils.getCounterValue();
    let condition = CONDITIONS[counter % CONDITIONS.length];
    this.trainingType = condition.training;
    this.testTypes = condition.testing;

    //TODO: move to the data saving 
    this.utils.incrementCounter();
  }

  pickFeaturesOrder() {
    let perms = this.utils.permute(["feature_a", "feature_b", "feature_c"]);
    this.featuresOrder = this.utils.pickRandomFromArray(perms);
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

}
