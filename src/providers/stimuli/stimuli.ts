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

  cueOrder: string[];
  trainingType: string;
  firstTestType: string;
  secondTestType: string;

  constructor(private utils: Utils) {
    console.log('Hello Stimuli Provider');
    this.pickCondition();
    this.pickCueOrder();
  }

  pickCondition() {
    console.log("[debug] pickCondition");
    let counter = this.utils.getCounterValue();
    console.log(counter);
    let condition = allConditions[counter % allConditions.length];
    console.log(condition);
    this.trainingType = condition.training;
    this.firstTestType = condition.testing[0];
    this.secondTestType = condition.testing[1];

    //TODO: move to the data saving 
    this.utils.incrementCounter();
  }

  pickCueOrder() {
    let perms = this.utils.permute(["friendly", "punctual", "funny"]);
    this.cueOrder = this.utils.pickRandomFromArray(perms);
  }

  isPassive() {
    return this.trainingType == "passive";
  }

  isActive() {
    return this.trainingType == "active";
  }

}
