import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { FirstRunPage } from '../pages/pages';
import { Stimuli} from '../providers/providers';

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

  constructor(private translate: TranslateService, private platform: Platform, 
    private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,
    private androidFullScreen: AndroidFullScreen, private stimuli: Stimuli) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error))
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
      this.initTranslate();
  }

  initTranslate() {
    // Set the default language
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');

    // Get language from local storage
    if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
      this.translate.use(localStorage.getItem('lang'));
    }

    // Update language when changed by an app component
    this.stimuli.langChangedEvent.subscribe(lang => {
      console.log('language change evend emitted: ', lang);
      this.translate.use(lang);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
