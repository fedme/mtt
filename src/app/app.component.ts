import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Nav, Platform } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { FirstRunPage, OnlineFirstRunPage } from '../pages/pages';
import { Stimuli, Data } from '../providers/providers';
import { Participant } from '../models/participant';

declare var cordova: any;

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  constructor(
    private translate: TranslateService, 
    private platform: Platform,
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private androidFullScreen: AndroidFullScreen, 
    private stimuli: Stimuli,
    private data: Data
  ) {

      // Set mobile full screen and pinned mode
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.enterPinnedMode();
        this.enterImmersiveMode();
      });


      // Initialize providers
      console.log('component constructor calling stimuli.initialize()');
      this.stimuli.initialize();
      this.data.initialize();

      // Initialize translation system
      this.initTranslate();

      // Parse URL params and detect online version
      this.parseUrlParams();
  }

  /**
	 * ParseUrlParams()
	 */
  async parseUrlParams() {

    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    
    // Check if online version...
    if (params.get("assignmentId")) {

      // Parse participant info
      this.stimuli.onlineVersion = true;
      this.stimuli.onlineParticipant = new Participant(params.get("workerId"));
      this.stimuli.onlineParticipant.code = params.get("workerId");
      this.stimuli.onlineParticipant.workerId = params.get("workerId");
      this.stimuli.onlineParticipant.assignmentId = params.get("assignmentId");
      this.stimuli.onlineParticipant.hitId = params.get("hitId");
      this.stimuli.onlineParticipant.age = Number(params.get("age"));
      this.stimuli.onlineParticipant.grade = Number(params.get("grade"));
      this.stimuli.onlineParticipant.dob = new Date(params.get("dob"));
      this.stimuli.onlineParticipant.gender = params.get("gender");
      const lang = params.get("lang");

      if ( params.get("isMturk")) {
        this.stimuli.onlineParticipant.isMturk = Number(params.get("isMturk")) == 1;
      }

      if ( params.get("isSandbox")) {
        this.stimuli.onlineParticipant.isSandbox = Number(params.get("isSandbox")) == 1;
      }

      console.log("[DEBUG] Online Version", this.stimuli.onlineParticipant);


      // Parse condition by id
      if (params.get("cid")) {
        this.stimuli.setConditionById(
          parseInt(params.get("cid"))
        );
      }

      // Or parse condition from individual properties
      else if (params.get("func")) {
        this.stimuli.setCondition(
          Number(params.get("nTraining")),
          Number(params.get("func")),
          params.get("trainingType"),
          Number(params.get("testingOrder")),
        );
      }

      // Or ask the server  for a condition id
      else {
        await this.stimuli.getConditionFromServer();
      }

      // Set language
      if (lang != null && lang != "") {
        this.stimuli.setLang(lang);
      }

      // Initialize conditions
      this.stimuli.initializeConditions();

      this.data.sendStartedToServer();

      console.log('participant', this.stimuli.onlineParticipant);

      // Go to the consent form
      this.rootPage = OnlineFirstRunPage;
    }
  }

  /**
	 * enterPinnedMode()
	 */
	enterPinnedMode() {
		if (typeof cordova !== 'undefined') {
			cordova.plugins.screenPinning.enterPinnedMode(
				() => { console.log('entered pinned mode') },
				(error) => { console.log('error when entering pinned mode: ' + error) },
				true
			);
		}
	}

	/**
	 * enterImmersiveMode()
	 */
	enterImmersiveMode() {
		this.androidFullScreen.isImmersiveModeSupported()
			.then(() => this.androidFullScreen.immersiveMode())
			.catch((error: any) => console.log(error));
	}

  initTranslate() {
    // Set the default language
    this.translate.addLangs(['en', 'de', 'es', 'notext']);
    this.translate.setDefaultLang('en');

    // Get language from local storage
    if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
      this.translate.use(localStorage.getItem('lang'));
    }

    // Update language when changed by an app component
    this.stimuli.langChangedEvent.subscribe(lang => {
      console.log('[DEBUG] language change evend emitted: ', lang);
      this.translate.use(lang);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
