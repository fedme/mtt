import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingInstructionsPage } from './training-instructions';

@NgModule({
  declarations: [
    TrainingInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingInstructionsPage),
    TranslateModule.forChild()
  ],
})
export class TrainingInstructionsPageModule {}
