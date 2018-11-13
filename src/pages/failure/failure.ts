import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';


@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-failure',
  templateUrl: 'failure.html',
})
export class FailurePage {

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


}
