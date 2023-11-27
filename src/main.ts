import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from 'jquery';

import { AppModule } from './app/app.main.module';

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
