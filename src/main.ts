import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as log from 'loglevel';
import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { handleLoggerProd, handleLoggerDev } from './logger';

if (environment.production) {
  enableProdMode();
  if (localStorage && window) {
    handleLoggerProd();
  }
} else {
  if (localStorage && window) {
    handleLoggerDev();
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => log.error(err));
