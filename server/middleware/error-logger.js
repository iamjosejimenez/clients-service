'use strict';

const logger = require('../services/logger');

module.exports = () => {
  return (error, _req, _res, next) => {
    logger.error(error);
    next(error);
  };
};
