import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli, Data } from '../../providers/providers';
import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-instructions-check',
  templateUrl: 'instructions-check.html',
})
export class InstructionsCheckPage {

  questionsForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public stimuli: Stimuli,
    private data: Data
  ) {

    this.questionsForm = new FormGroup({
      "question-goal": new FormControl(),
      "question-fruits": new FormControl(),
      "question-cards": new FormControl(),
    });
    
  }

  /*doSubmit(event) {
    
    event.preventDefault();
  }*/

  ionViewDidLoad() {
    //console.log('ionViewDidLoad InstructionsCheckPage');
  }

  next() {
    //this.navCtrl.pop();
    //console.log('Submitting form', this.questionsForm.value);
    if (this.questionsForm.value["question-goal"] == null || this.questionsForm.value["question-fruits"] == null || this.questionsForm.value["question-cards"] == null) return;

    this.stimuli.questionsCheck.push(this.questionsForm.value);

    const numberCheckCorrect =
      parseInt(this.questionsForm.value["question-cards"]) == this.stimuli.condition.trainingTasks
      || (this.questionsForm.value["question-cards"] == "all" && this.stimuli.condition.trainingTasks == 27)
      || (this.questionsForm.value["question-cards"] == "none" && this.stimuli.condition.trainingTasks == 0);

    const answerCorrect = 
      this.questionsForm.value["question-goal"] == "correct" 
      && this.questionsForm.value["question-fruits"] == "correct" 
      && numberCheckCorrect;

    if (answerCorrect) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3)); //go back to the training
    }
    else {
      this.stimuli.questionsCheckCounter++;

      // If answer is wrong but still have attempts, go to through instructions again
      if (this.stimuli.questionsCheckCounter < 3) {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 2)); //go back to the training instructions 2
      }

      // Otherwise, fail experiment
      else {
        this.data.sendFailureToServer();
        this.navCtrl.setRoot('FailurePage');
      }
      
    }


  }

  

}
