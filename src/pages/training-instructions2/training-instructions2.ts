import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-training-instructions2',
  templateUrl: 'training-instructions2.html',
})
export class TrainingInstructions2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli) {
      console.log("[DEBUG] trainig type:", this.stimuli.trainingType);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingInstructions2Page');
  }

  showErrorMessage() {
    return this.stimuli.questionsCheckCounter > 0;
  }

  next() {
    if (!this.stimuli.runInBrowser) {
      this.navCtrl.pop();
    }
    else {
      this.navCtrl.push("InstructionsCheckPage");
    }
  }

}
