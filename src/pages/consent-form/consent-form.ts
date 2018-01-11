import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-consent-form',
  templateUrl: 'consent-form.html',
})
export class ConsentFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsentFormPage');
  }

  next() {
    //this.navCtrl.pop();
    this.navCtrl.push("TrainingInstructionsPage");
  }

}
