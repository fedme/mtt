import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers'

/**
 * Generated class for the TestInstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test-instructions',
  templateUrl: 'test-instructions.html',
})
export class TestInstructionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestInstructionsPage');
  }

  next() {
    if (this.isComparison()) {
      this.navCtrl.push("PairComparisonPage");
    }
    else if (this.isEstimation()) {
      this.navCtrl.push("OutputEstimationPage");
    }
  }

  isComparison() {
    return this.stimuli.isCurrentTest("comparison");
  }

  isEstimation() {
    return this.stimuli.isCurrentTest("estimation");
  }

}
