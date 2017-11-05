import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { OutputEstimationPage } from './output-estimation';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OutputEstimationPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(OutputEstimationPage),
    TranslateModule.forChild()
  ],
})
export class OutputEstimationPageModule {}
