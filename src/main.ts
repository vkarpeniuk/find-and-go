import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as log from 'loglevel';
import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const disableConsole = () => {
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
};

const handleLoggerDev = () => {
  const loggerValue = localStorage.getItem('logger');
  if (!loggerValue || loggerValue === 'true') {
    log.setLevel(log.levels.TRACE, true);
  } else {
    disableConsole();
    log.setLevel(log.levels.SILENT, true);
  }
};

const handleLoggerProd = () => {
  const loggerValue = localStorage.getItem('logger');
  if (loggerValue === 'true') {
    log.setLevel(log.levels.TRACE, true);
  } else {
    disableConsole();
    log.setLevel(log.levels.SILENT, true);
  }
};

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
