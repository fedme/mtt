import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-consent-form',
  templateUrl: 'consent-form.html',
})
export class ConsentFormPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public stimuli: Stimuli
  ) {
      
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConsentFormPage');
  }

  next() {
    //this.navCtrl.pop();

    // initialize stimuli conditions
    //this.stimuli.initializeConditions();

    // proceed to training
    this.stimuli.setLang('en');
    this.navCtrl.push("TrainingInstructionsPage");
  }

}
