import { Component, Input } from '@angular/core';
import { Monster } from '../../models/monster';

/**
 * Generated class for the CardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent {

  @Input() monster: Monster;
  shown: boolean = false;

  constructor() {
    //console.log('Hello CardComponent Component');
  }

  cardTapped(event) {
    this.shown = this.shown ? false : true;
  }

  getCardBg() {
    if (!this.shown) return "assets/img/card/back.png";
    return "assets/img/card/front.png";
  }

  getFrontOpacity() {
    return this.shown ? 1 : 0;
  }

  getBackOpacity() {
    return this.shown ? 0 : 1;
  }

}
