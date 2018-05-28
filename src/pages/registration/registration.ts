import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Stimuli, Data } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';

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
      console.log('available langs: ', this.availableLangs);

      // Get if active-only-version from localStorage
      if (localStorage.getItem('active-only-version') != null && localStorage.getItem('active-only-version') != '') {
        this.isActiveOnlyVersion = localStorage.getItem('active-only-version') == 'true';
      }
      
      // Initialize providers
      this.stimuli.initialize();
      this.data.initialize();

      // Get language from localStorage
      if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
        this.lang = localStorage.getItem('lang');
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
    if (this.parseUrlParams()) {
      console.log("participant:", this.stimuli.participant);
      this.navCtrl.push('ConsentFormPage');
    }
  }

  handleRegistration() {
    // Remember if active-only version
    localStorage.setItem('active-only-version', this.isActiveOnlyVersion ? 'true' : 'false');

    // set Language
    this.stimuli.setLang(this.lang);
    localStorage.setItem('lang', this.lang);
  
    // initialize stimuli
    this.stimuli.onAferRegistration(this.isActiveOnlyVersion);
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

  parseUrlParams() {
    let codeProvided = false;
    if (document.URL.indexOf("?") > 0) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      let i: any;
      for (i in splitParams){
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == "participant_code"){
          this.stimuli.participant.code = singleURLParam[1];
          codeProvided = true;
        }
        else if (singleURLParam[0] == "workerId"){
          this.stimuli.participant.code = singleURLParam[1];
          codeProvided = true;
        }
        else if (singleURLParam[0] == "participant_age"){
          this.stimuli.participant.age = parseInt(singleURLParam[1]);
        }
        else if (singleURLParam[0] == "participant_grade"){
          this.stimuli.participant.grade = parseInt(singleURLParam[1]);
        }
        else if (singleURLParam[0] == "condition"){
          this.stimuli.conditionCounterOverride = parseInt(singleURLParam[1]);
          this.stimuli.pickCondition();
          console.log("[param][conditionCounterOverride]", parseInt(singleURLParam[1]));
          console.log( this.stimuli.conditionCounterOverride);
        }
      }
    }
    this.stimuli.onlineVersion = codeProvided != false;
    return codeProvided;
  }
 

}
