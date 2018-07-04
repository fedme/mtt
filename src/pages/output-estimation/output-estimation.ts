import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OutputEstimationQuestion } from '../../models/output-estimation-question';
import { Stimuli, OutputEstimationProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-output-estimation',
  templateUrl: 'output-estimation.html',
})
export class OutputEstimationPage {

  question: OutputEstimationQuestion;
  guessedCriterion: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli, private outputEstimation: OutputEstimationProvider) {
    
      // Initialize provider
      this.outputEstimation.initialize();
      this.updateCurrentQuestion();

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OutputEstimationPage');
  }

  next() {
    if (this.guessedCriterion == null) return;

    this.question.guessedCriterion = this.guessedCriterion;
    this.outputEstimation.updateQuestion(this.question);
    this.guessedCriterion = null;

    this.updateCurrentQuestion();
  }

  updateCurrentQuestion() {
    if (this.outputEstimation.runOutOfQuestions()) {
      return this.end();
    }
    this.question = this.outputEstimation.getNextQuestion();
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
