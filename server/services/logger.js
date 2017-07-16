// Configuration taken from:
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

'use strict';

const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, _) => logger.info(message),
};

module.exports = logger;
