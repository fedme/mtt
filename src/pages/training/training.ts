import { Component, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Monster } from '../../models/monster';
import { Utils, Stimuli, TrainingProvider} from '../../providers/providers';
import { CardComponent } from '../../components/card/card';

/**
 * Generated class for the TrainingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  monsters: Monster[];
  //revealedMonsters: Monster[];
  waitingForReveal: boolean = false;
  ended:boolean = false;
  cardsDeactivated: boolean = true;
  secondInstructionsShown: boolean = false;

  @ViewChildren(CardComponent) cardComponents: QueryList<CardComponent>;
  cards: CardComponent[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private utils: Utils, private stimuli: Stimuli, private training: TrainingProvider) {

    this.monsters = this.training.getAllMonsters();
    //this.revealedMonsters = []; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');

    if (this.stimuli.isPassive()) {
      this.pickRandomCards();
    }

  }

  handleCardRevealed(monster: Monster) {
    this.deactivateCards();
    this.training.addRevealedMonster(monster);
    this.waitingForReveal = false;
    if (this.training.getRevealedMonstersCount() == 22) {
      this.ended = true;
    }
  }

  pickRandomCards() {
    this.cards = this.cardComponents.toArray();
    for (let card of this.cards) {
      card.active = false;
    }
    this.utils.shuffleArray(this.cards);
  }

  nextPick() {
    if (this.waitingForReveal) return;

    // if button clicked after the 1st revealed card, go to instructions 2
    if (this.training.getRevealedMonstersCount() == 1
      && !this.secondInstructionsShown ) {
      this.secondInstructionsShown = true;
      return this.navCtrl.push("TrainingInstructions2Page");
    }

    this.waitingForReveal = true;
    if (this.stimuli.isPassive()) {
      this.highlightRandomCard();
    }
    else {
      this.activateCards();
    }
  }

  highlightRandomCard() {
    let card = this.cards.pop();
    card.highlightCard();
    card.active = true;
  }

  deactivateCards() {
    this.cardsDeactivated = true;
  }

  activateCards() {
    this.cardsDeactivated = false;
  }

  areCardsActive() {
    return !this.cardsDeactivated;
  }

  endTraining() {
    this.navCtrl.push("TestInstructionsPage");
  }
}
