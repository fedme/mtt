import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PairComparisonPage } from './pair-comparison';

@NgModule({
  declarations: [
    PairComparisonPage,
  ],
  imports: [
    IonicPageModule.forChild(PairComparisonPage),
    TranslateModule.forChild()
  ],
})
export class PairComparisonPageModule {}
