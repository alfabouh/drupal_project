import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from 'jquery';

import { AppModule } from './app/app.main.module';
import { MainModule } from './app/components/site/application/main.module';

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
