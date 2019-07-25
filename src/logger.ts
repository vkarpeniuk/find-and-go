import * as log from 'loglevel';

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

export const handleLoggerDev = () => {
  const loggerValue = localStorage.getItem('logger');
  if (!loggerValue || loggerValue === 'true') {
    log.setLevel(log.levels.TRACE, true);
  } else {
    disableConsole();
    log.setLevel(log.levels.SILENT, true);
  }
};

export const handleLoggerProd = () => {
  const loggerValue = localStorage.getItem('logger');
  if (loggerValue === 'true') {
    log.setLevel(log.levels.TRACE, true);
  } else {
    disableConsole();
    log.setLevel(log.levels.SILENT, true);
  }
};
