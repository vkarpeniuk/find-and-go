import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
  if (window) {
    disableConsole();
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

function disableConsole() {
  const consoleMethods: string[] = [
    'assert',
    'clear',
    'count',
    'error',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'table',
    'time',
    'timeEnd',
    'trace',
    'warn'
  ];

  consoleMethods.forEach(method => {
    window.console[method] = () => {};
  });
}
