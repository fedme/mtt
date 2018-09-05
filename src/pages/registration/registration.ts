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

      // Initialize providers
      this.stimuli.initialize();
      this.data.initialize();

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

    // Set additional participant props
    this.stimuli.participant.ageGroup = this.stimuli.getParticipantAgeGroup(this.stimuli.participant.age);
  
    // initialize stimuli
    this.stimuli.initializeConditions(this.isActiveOnlyVersion);
    this.navCtrl.push('TrainingInstructionsPage');
  }

  validateRegistration() {

    const codeNull = this.stimuli.participant.code == null
      || this.stimuli.participant.code == "";

    const genderNull = this.stimuli.participant.gender == null
      || this.stimuli.participant.gender == "";

    const ageNull = this.stimuli.participant.age == null
      || this.stimuli.participant.age == 0;

    // If some info is missing...
    if (codeNull || ageNull || genderNull) {

      let alertMsg: string = "You are missing: ";
      if (codeNull) alertMsg += "<br>- Participant Code";
      if (ageNull) alertMsg += "<br>- Age";
      if (genderNull) alertMsg += "<br>- Gender";

      // Present alert
      let alert = this.alertCtrl.create({
        title: 'Missing some info. Proceed?',
        message: alertMsg,
        buttons: [
          {
            text: 'Proceed',
            handler: () => {

              // Fill default info

              if (ageNull) {
                this.stimuli.participant.age = 0;
                this.stimuli.participant.grade = 0;
              }

              if (codeNull) {
                this.stimuli.participant.code = "nocode";
              }

              this.handleRegistration();
            }
          },
          {
            text: 'Stay here',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      alert.present();
    }

    // Otherwise, proceed to registration
    else {
      this.handleRegistration();
    }

  }

  public convertToNumber(event):number {  return +event; }

  showRecords() {
    let recordsModal = this.modalCtrl.create("ViewRecordsPage");
    recordsModal.present();
  }

}
