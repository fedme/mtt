import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TestInstructionsPage } from './test-instructions';

@NgModule({
  declarations: [
    TestInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestInstructionsPage),
    TranslateModule.forChild()
  ],
})
export class TestInstructionsPageModule {}
