const exec = require('child_process').exec;
const logger = require('winston');
require('./logger');

const commandline = {
  get: (command, callback) => {
    return exec(
      command,
      (
        function () {
          return function (err, data, stderr) {
            if (!callback)
              return;
            logger.debug(`${command} is running`);
            callback(err, data, stderr);
          };
        }
      )(callback)
    );
  },
  run: (command) => {
    return exec(
      command
    );
  }
};

module.exports = commandline;
