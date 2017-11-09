import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RankingTaskPage } from './ranking-task';

@NgModule({
  declarations: [
    RankingTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(RankingTaskPage),
    TranslateModule.forChild()
  ],
})
export class RankingTaskPageModule {}
