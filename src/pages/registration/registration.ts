import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Stimuli, Data } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { OnlineFirstRunPage } from "../pages";

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  isActiveOnlyVersion: boolean = false;
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

      // Get if active-only-version from localStorage
      if (localStorage.getItem('active-only-version') != null && localStorage.getItem('active-only-version') != '') {
        this.isActiveOnlyVersion = localStorage.getItem('active-only-version') == 'true';
      }

      // Get language from localStorage
      if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
        this.lang = localStorage.getItem('lang');
      }

      // Prevent access to this page from online version
      if (this.stimuli.onlineVersion) {
        this.navCtrl.setRoot(OnlineFirstRunPage);
      }

  }

  handleRegistration() {
    // Remember if active-only version
    localStorage.setItem('active-only-version', this.isActiveOnlyVersion ? 'true' : 'false');

    // set Language
    this.stimuli.setLang(this.lang);
    localStorage.setItem('lang', this.lang);
  
    // initialize stimuli
    this.stimuli.initializeConditions(this.isActiveOnlyVersion);
    this.navCtrl.push('TrainingInstructionsPage');
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

  showRecords() {
    let recordsModal = this.modalCtrl.create("ViewRecordsPage");
    recordsModal.present();
  }

}
