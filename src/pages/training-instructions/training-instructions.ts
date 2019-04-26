import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';

/**
 * Generated class for the TrainingInstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-training-instructions',
  templateUrl: 'training-instructions.html',
})
export class TrainingInstructionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public stimuli: Stimuli
  ) {
    //
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TrainingInstructionsPage');
  }

  next() {
    console.log('extcond', this.stimuli.isExtendedCondition2());
    if (this.stimuli.isExtendedCondition2()) {
      this.navCtrl.push("TrainingInstructions2Page");
    }
    else {
      this.navCtrl.push("TrainingPage");
    }
  }

}
