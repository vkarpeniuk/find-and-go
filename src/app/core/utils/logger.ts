const logger = {
  enable: () => {
    localStorage.setItem('logger', 'true');
  },
  disable: () => {
    localStorage.setItem('logger', 'false');
  }
};

export const initLogger = () => {
  if (window) {
    window['logger'] = logger;
  }
};
