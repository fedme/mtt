import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// RELEASE: disable console log
// console.log = function(){};

platformBrowserDynamic().bootstrapModule(AppModule);
