import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { Pro } from '@ionic/pro';

import { Api, Utils, Data, Stimuli, TrainingProvider, PairComparisonProvider, 
  OutputEstimationProvider, RankingTaskProvider} from '../providers/providers';
import { AppInfo } from '../providers/stimuli/app-info';
import { MyApp } from './app.component';


// Ionic Pro
Pro.init(AppInfo.id, {
  appVersion: AppInfo.version
})


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


// Error Handler
@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}


// App Module
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot({
      name: 'data',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    SplashScreen,
    StatusBar,
    AndroidFullScreen,
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    File,
    Device,
    Api,
    Utils,
    Data,
    Stimuli,
    TrainingProvider,
    PairComparisonProvider,
    OutputEstimationProvider,
    RankingTaskProvider
  ]
})
export class AppModule { }
