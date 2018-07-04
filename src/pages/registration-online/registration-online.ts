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

      // Parse available langs
      this.availableLangs = this.translate.langs;

      // Get language from localStorage
      if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
        this.lang = localStorage.getItem('lang');
      }   

  }

  handleRegistration() {

    // set Language
    this.stimuli.setLang(this.lang);
    localStorage.setItem('lang', this.lang);
  
    // initialize stimuli conditions
    this.stimuli.initializeConditions();
    this.navCtrl.push('ConsentFormPage');
  }

  validateRegistration() {
    const ageNull = this.stimuli.participant.age == null;
    const genderNull = this.stimuli.participant.gender == null;
    if (ageNull || genderNull) {

      if (ageNull) {
        this.stimuli.participant.age = 0;
      }

      let alert = this.alertCtrl.create({
        title: 'Proceed without age/gender?',
        message: 'Are you sure you want to proceed without entering age/gender?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.handleRegistration();
            }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      alert.present();
    }
    else {
      this.handleRegistration();
    }
  }

}
