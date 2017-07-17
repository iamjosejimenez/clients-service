'use strict';

const request = require('request-promise');
const {CLIENTS_URL, POLICIES_URL}  = require('../constants.json');
const Promise = require('bluebird');
const logger = require('../services/logger');

const handlers = [{
  uri: CLIENTS_URL,
  model: 'client',
  attr: 'clients',
}, {
  uri: POLICIES_URL,
  model: 'policy',
  attr: 'policies',
}];

const processData = (server, {uri, model, attr}) => {
  const options =  {
    uri,
    json: true,
  };
  return request(options)
    .then(body => {
      const Model = server.models[model];
      const data = body[attr];
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

const getClients = server => {
  return processData(server, handlers[0]);
};

const getPolicies = server => {
  return processData(server, handlers[1]);
};

module.exports = {
  downloadData,
  getClients,
  getPolicies,
};
