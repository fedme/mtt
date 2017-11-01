import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import 'rxjs/add/operator/map';
import { allConditions } from './constants';

/*
  Generated class for the StimuliProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Stimuli {

  featuresOrder: string[];
  trainingType: string;
  firstTestType: string;
  secondTestType: string;

  constructor(private utils: Utils) {
    console.log('Hello Stimuli Provider');
    this.pickCondition();
    this.pickFeaturesOrder();

    console.log("[featuresOrder]", this.featuresOrder);
    console.log("[trainingType]", this.trainingType);
    console.log("[firstTestType]", this.firstTestType);
    console.log("[secondTestType]", this.secondTestType);
  }

  pickCondition() {
    let counter = this.utils.getCounterValue();
    let condition = allConditions[counter % allConditions.length];
    this.trainingType = condition.training;
    this.firstTestType = condition.testing[0];
    this.secondTestType = condition.testing[1];

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

}
