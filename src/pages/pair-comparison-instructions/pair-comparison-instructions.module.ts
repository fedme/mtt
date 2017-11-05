import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PairComparisonInstructionsPage } from './pair-comparison-instructions';

@NgModule({
  declarations: [
    PairComparisonInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PairComparisonInstructionsPage),
    TranslateModule.forChild()
  ],
})
export class PairComparisonInstructionsPageModule {}
