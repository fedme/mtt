import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [CardComponent],
	imports: [
		TranslateModule.forChild()
	],
	exports: [CardComponent]
})
export class ComponentsModule {}
