import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { TrainingCard } from '../../models/training-card';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';
import { NUMBERS } from '../stimuli/constants';

@Injectable()
export class TrainingProvider {

  cards: TrainingCard[];
  revealedCardsCounter: number;

  constructor(private utils: Utils, private stimuli: Stimuli) {
    console.log('Hello TrainingMonsters Provider');
    this.cards = [];
    this.revealedCardsCounter = 0;
    this.generateCards();
  }

  generateCards() {
    let genes = this.utils.combine([2, 3, 4], 3, "");
    let ids = this.utils.range(1, genes.length + 1)
    this.utils.shuffleArray(genes);
    this.utils.shuffleArray(ids);

    let i = 0;
    for (let gene of genes) {

      let monsterId = "monster" + (ids[i]);

      let feature_a = parseInt(gene.charAt(0));
      let feature_b = parseInt(gene.charAt(1));
      let feature_c = parseInt(gene.charAt(2));

      let criterion = this.stimuli.calculateCriterion(
        feature_a,
        feature_b,
        feature_c
      );

      let monster = new Monster(
        monsterId, 
        feature_a, 
        feature_b, 
        feature_c,
        criterion
      );
      this.cards.push(new TrainingCard(monster));
      i++;
    }
  }

  getAllCards() {
    return this.cards;
  }

  addCard(card: TrainingCard) {
    this.cards.push(card);
  }

  deleteCard(card: TrainingCard) {
    this.cards.splice(this.cards.indexOf(card), 1);
  }

  updateCard(card: TrainingCard) {
    const idx = this.cards.indexOf(card);
    this.cards[idx] = card;
    if (card.hasBeenRevealed()) {
      this.revealedCardsCounter++;
    }
  }

  getRevealedCardsCount() {
    return this.revealedCardsCounter;
  }

  runOutOfTasks() {
    return this.revealedCardsCounter >= NUMBERS.TRAINING_TASKS;
  }

  getRevealedCards() {
    let revealedCards: TrainingCard[] = [];
    for (let card of this.cards) {
      if (card.hasBeenRevealed()) {
        revealedCards.push(card);
      }
    }
    return revealedCards;
  }

  getUnrevealedCards() {
    let unrevealedCards: TrainingCard[] = [];
    for (let card of this.cards) {
      if (!card.hasBeenRevealed()) {
        unrevealedCards.push(card);
      }
    }
    return unrevealedCards;
  }

  getRevealedMonsters() {
    let revealedMonsters: Monster[] = [];
    for (let card of this.cards) {
      if (card.hasBeenRevealed()) {
        revealedMonsters.push(card.monster);
      }
    }
    return revealedMonsters;
  }

  getUnrevealedMonsters() {
    let unrevealedMonsters: Monster[] = [];
    for (let card of this.cards) {
      if (!card.hasBeenRevealed()) {
        unrevealedMonsters.push(card.monster);
      }
    }
    return unrevealedMonsters;
  }

}
