import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pair } from '../../models/pair';
import { Monster } from '../../models/monster';
import { PairComparisonProvider } from '../../providers/providers';
import { CardComponent } from '../../components/card/card';

/**
 * Generated class for the TestInstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pair-comparison',
  templateUrl: 'pair-comparison.html',
})
export class PairComparisonPage {

  questionCounter: number = 0;
  currentPair: Pair;
  chosenCard: CardComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pairComparison: PairComparisonProvider) {
      this.updateCurrentPair();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPairComparisonPage');
  }

  handleCardTapped(card: CardComponent) {
    if (this.chosenCard != null) {
      this.chosenCard.removeHighlight();
    }
    this.chosenCard = card;
    card.highlightCard();
  }

  next() {
    if (this.chosenCard == null) return;
    if (this.questionCounter == (this.pairComparison.pairsNumber - 1)) {
      return this.end();
    }
    this.pairComparison.addChosenMonster(this.chosenCard.getMonster());
    this.chosenCard.removeHighlight();
    this.chosenCard = null;
    this.questionCounter++;
    this.updateCurrentPair();
  }

  updateCurrentPair() {
    this.currentPair = this.pairComparison.pairs[this.questionCounter];
  }

  end() {

  }

}
