import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import 'rxjs/add/operator/map';
import { CONDITIONS } from './constants';

/*
  Generated class for the StimuliProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Stimuli {

  featuresOrder: string[];
  trainingType: string;
  testTypes: string[];
  currentTestIndex: number = -1;

  constructor(private utils: Utils) {
    console.log('Hello Stimuli Provider');
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

}
