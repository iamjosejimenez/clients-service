'use strict';

const morgan = require('morgan');
const logger = require('../services/logger');

module.exports = (server) =>
  server.use(morgan('combined', {'stream': logger.stream}));
