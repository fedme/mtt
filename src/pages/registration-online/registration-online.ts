import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Stimuli, Data } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { URLSearchParams } from "@angular/http";

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-registration-online',
  templateUrl: 'registration-online.html',
})
export class RegistrationOnlinePage {

  lang: string = "en";
  availableLangs: string[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private stimuli: Stimuli, 
    private data: Data,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    

  }

  handleRegistration() {

      // Save data and go to reward page
      this.data.save();

      this.navCtrl.push("RewardPage");
  }

  validateRegistration() {

    const checks = 
      this.stimuli.onlineParticipant.age != null
      && this.stimuli.onlineParticipant.age > 0
      && this.stimuli.onlineParticipant.gender != null
      && this.stimuli.onlineParticipant.playedBefore != null
      && this.stimuli.onlineParticipant.languageProficiency != null

    if (checks) {
      this.handleRegistration();
    }

    else {
      let alert = this.alertCtrl.create({
        title: 'Missing Information',
        message: 'Please fill all the fields',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      alert.present();
    }
  }

}
