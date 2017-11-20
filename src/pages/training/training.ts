import { Component, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrainingCard } from '../../models/training-card';
import { Utils, Stimuli, TrainingProvider} from '../../providers/providers';
import { CardComponent } from '../../components/card/card';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  //monsters: Monster[];
  //revealedMonsters: Monster[];
  waitingForReveal: boolean = false;
  ended:boolean = false;
  cardsDeactivated: boolean = true;
  secondInstructionsShown: boolean = false;

  @ViewChildren(CardComponent) cardComponents: QueryList<CardComponent>;
  cards: CardComponent[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private utils: Utils, private stimuli: Stimuli, private training: TrainingProvider) {
     
      // Initialize provider
      this.training.initialize();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');
    if (this.stimuli.isPassive()) {
      this.pickRandomCards();
    }
  }

  handleTrainingCardRevealed(card: TrainingCard) {
    this.deactivateCards();
    card.reveal();
    this.training.updateCard(card);
    this.waitingForReveal = false;
    if (this.training.runOutOfTasks()) {
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
    if (this.training.getRevealedCardsCount() == 1
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
    const test = this.stimuli.getNextTestType();
    if (test == "comparison") {
      this.navCtrl.push("PairComparisonInstructionsPage");
    }
    else {
      this.navCtrl.push("OutputEstimationInstructionsPage");               
    }
  }
}
