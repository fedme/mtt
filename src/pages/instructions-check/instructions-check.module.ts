import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { InstructionsCheckPage } from './instructions-check';

@NgModule({
  declarations: [
    InstructionsCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructionsCheckPage),
    TranslateModule.forChild()
  ],
})
export class InstructionsCheckPageModule {}
