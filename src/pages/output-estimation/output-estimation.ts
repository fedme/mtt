import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OutputEstimationQuestion } from '../../models/output-estimation-question';
import { Stimuli, OutputEstimationProvider } from '../../providers/providers';
import { CardComponent } from '../../components/card/card';

/**
 * Generated class for the TestInstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
      this.outputEstimation.generateQuestions();
      this.updateCurrentQuestion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutputEstimationPage');
  }

  next() {
    if (this.guessedCriterion == null) return; // TODO: check slider moved
    if (this.outputEstimation.runOutOfQuestions()) {
      return this.end();
    }

    // TODO: ...
    this.question.guessedCriterion = this.guessedCriterion;
    this.outputEstimation.updateQuestion(this.question);
    this.guessedCriterion = null;
    this.updateCurrentQuestion();
  }

  updateCurrentQuestion() {
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
