import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import 'rxjs/add/operator/map';

/*
  Generated class for the StimuliProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Stimuli {

  cueOrder: string[];

  constructor(private utils: Utils) {
    console.log('Hello StimuliProvider Provider');
    this.pickCueOrder();
  }

  pickCueOrder() {
    let perms = this.utils.permute(["friendly", "punctual", "funny"]);
    console.log(perms);
    this.cueOrder = this.utils.pickRandomFromArray(perms);
    console.log(this.cueOrder);
  }



}
