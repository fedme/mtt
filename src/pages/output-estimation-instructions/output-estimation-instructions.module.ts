import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { OutputEstimationInstructionsPage } from './output-estimation-instructions';

@NgModule({
  declarations: [
    OutputEstimationInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(OutputEstimationInstructionsPage),
    TranslateModule.forChild()
  ],
})
export class OutputEstimationInstructionsPageModule {}
