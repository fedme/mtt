import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ConsentFormPage } from './consent-form';

@NgModule({
  declarations: [
    ConsentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsentFormPage),
    TranslateModule.forChild()
  ],
})
export class ConsentFormPageModule {}
