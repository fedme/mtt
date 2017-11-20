import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RewardPage } from './reward';

@NgModule({
  declarations: [
    RewardPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardPage),
    TranslateModule.forChild()
  ],
})
export class RewardPageModule {}
