import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monster } from '../../models/monster';
import { TrainingCard } from '../../models/training-card';

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
  @Input() active: boolean;
  @Input() trainingCard: TrainingCard;
  @Output() cardTapped = new EventEmitter();
  @Output() trainingCardRevealed = new EventEmitter();
  revealed: boolean = false;
  highlighted: boolean = false;

  constructor() {
    //console.log('Hello CardComponent Component');
  }

  handleCardTapped(event) {
    this.cardTapped.emit(this);
    if (!this.active) return;
    if (this.revealed) return;
    this.revealCard();
  }

  highlightCard() {
    this.highlighted = true;
  }

  removeHighlight() {
    this.highlighted = false;
  }

  revealCard() {
    this.revealed = true;
    if (this.highlighted) {
      this.highlighted = false;
    }
    this.trainingCardRevealed.emit(this.trainingCard);
  }

  getMonster() {
    return this.monster;
  }

  getCardBg() {
    if (!this.revealed) return "assets/img/card/back.png";
    return "assets/img/card/front.png";
  }

  notRevealedOpacity() {
    return this.revealed ? 0 : 1;
  }

  highlightOpacity() {
    return this.highlighted ? 1 : 0;
  }

  revealedOpacity() {
    return this.revealed ? 1 : 0;
  }

}
