import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monster } from '../../models/monster';
import { Stimuli } from '../../providers/providers';

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
  @Output() cardFlipped = new EventEmitter();
  flipped: boolean = false;

  constructor(private stimuli: Stimuli) {
    //console.log('Hello CardComponent Component');
  }

  cardTapped(event) {
    if (this.stimuli.isPassive()) return;
    if (this.flipped) return;
    this.flipCard();
  }

  flipCard() {
    this.flipped = true;
    this.cardFlipped.emit(this.monster);
  }

  getCardBg() {
    if (!this.flipped) return "assets/img/card/back.png";
    return "assets/img/card/front.png";
  }

  getFrontOpacity() {
    return this.flipped ? 0 : 1;
  }

  getBackOpacity() {
    return this.flipped ? 1 : 0;
  }

}
