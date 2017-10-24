import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingPage } from './training';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TrainingPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TrainingPage),
    TranslateModule.forChild()
  ],
})
export class TrainingPageModule {}
