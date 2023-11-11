import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from 'jquery';

import { AppModule } from './app/app.module';
import { printTest } from './app/app.test';

$(() => {
  printTest();
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
