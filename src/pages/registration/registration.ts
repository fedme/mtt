import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Stimuli, Data } from '../../providers/providers';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private stimuli: Stimuli, private data: Data, private toastCtrl: ToastController) {
      
      // Initialize providers
      this.stimuli.initialize();
      this.data.initialize();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  handleRegistration() {
    if (this.validateRegistration()) {
      this.navCtrl.push('TrainingInstructionsPage');
    }
  }

  validateRegistration() {
    const ageNull = this.stimuli.participant.age == null;
    if (ageNull) {
      let toast = this.toastCtrl.create({
        message: 'Please enter participant age',
        duration: 3000
      });
      toast.present();
      return false;
    }
    return true;
  }
 

}
