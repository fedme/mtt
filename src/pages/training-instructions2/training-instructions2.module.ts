import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingInstructions2Page } from './training-instructions2';

@NgModule({
  declarations: [
    TrainingInstructions2Page,
  ],
  imports: [
    IonicPageModule.forChild(TrainingInstructions2Page),
    TranslateModule.forChild()
  ],
})
export class TrainingInstructions2PageModule {}
