import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PairComparisonPage } from './pair-comparison';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PairComparisonPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PairComparisonPage),
    TranslateModule.forChild()
  ],
})
export class PairComparisonPageModule {}
