import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PairComparisonQuestion } from '../../models/pair-comparison-question';
import { Stimuli, PairComparisonProvider } from '../../providers/providers';
import { CardComponent } from '../../components/card/card';


@IonicPage()
@Component({
  selector: 'page-pair-comparison',
  templateUrl: 'pair-comparison.html',
})
export class PairComparisonPage {

  question: PairComparisonQuestion;
  chosenCard: CardComponent;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private stimuli: Stimuli, 
    private pairComparison: PairComparisonProvider
  ) {
      
      // Initialize provider
      this.pairComparison.initialize();
      this.updateCurrentQuestion();

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
    
    const chosenMonster = this.chosenCard.getMonster();
    this.question.answer(chosenMonster);
    this.pairComparison.updateQuestion(this.question);

    this.chosenCard.removeHighlight();
    this.chosenCard = null;

    this.updateCurrentQuestion();
  }

  updateCurrentQuestion() {
    if (this.pairComparison.runOutOfQuestions()) {
      return this.end();
    }
    this.question = this.pairComparison.getNextQuestion();
  }

  end() {
    if (this.stimuli.runOutOfTests()) {
      this.navCtrl.push("RankingTaskPage");
      return;
    }
    const test = this.stimuli.getNextTestType();
    if (test == "comparison") {
      this.navCtrl.push("PairComparisonInstructionsPage");
    }
    else {
      this.navCtrl.push("OutputEstimationInstructionsPage");               
    }
  }

}
