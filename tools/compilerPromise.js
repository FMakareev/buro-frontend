import {logMessage} from "./index";

export const compilerPromise = compiler =>
  new Promise(resolve => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }

      logMessage('Compiler promise error.', 'error');
      return Promise.reject(new Error(stats));
    });
  });

export default compilerPromise;
