const exec = require('child_process').exec;
const logger = require('winston');
require('./logger');

const commandline = {
  get: (command, callback) => {
    const output= exec(
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
    output.stdout.pipe(process.stdout);
    return output;
  },
  run: (command) => {
    const output= exec(
      command
    );
    output.stdout.pipe(process.stdout);
    return output;
  }
};

module.exports = commandline;
