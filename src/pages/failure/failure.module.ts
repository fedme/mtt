import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FailurePage } from './failure';

@NgModule({
  declarations: [
    FailurePage,
  ],
  imports: [
    IonicPageModule.forChild(FailurePage),
    TranslateModule.forChild()
  ],
})
export class FailureModule {}
