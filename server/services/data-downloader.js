'use strict';

const request = require('request');
const {CLIENTS_URL, POLICIES_URL}  = require('../constants.json');
const Promise = require('bluebird');
const logger = require('../services/logger');

const handlers = [{
  url: CLIENTS_URL,
  model: 'client',
  attr: 'clients',
}, {
  url: POLICIES_URL,
  model: 'policy',
  attr: 'policies',
}];

const processData = (server, {url, model, attr}) => {
  request(url, (error, _, body) => {
    if (error) {
      throw error;
    }
    const Model = server.models[model];
    const data = JSON.parse(body)[attr];
    return Promise
      .map(data, object => Model.upsert(object))
      .catch(error => logger.error(error));
  });
};

const downloadData = server => {
  return Promise
    .map(handlers, handler => processData(server, handler))
    .catch(error => logger.error(error));
};

module.exports = {
  downloadData,
};
