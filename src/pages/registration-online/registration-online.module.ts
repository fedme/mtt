import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationOnlinePage } from './registration-online';

@NgModule({
  declarations: [
    RegistrationOnlinePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationOnlinePage),
    TranslateModule.forChild()
  ],
})
export class RegistrationOnlinePageModule {}
