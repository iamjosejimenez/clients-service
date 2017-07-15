'use strict';

var request = require('request');
var CLIENTS_URL = 'http://www.mocky.io/v2/5808862710000087232b75ac';
var POLICIES_URL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
var Promise = require('bluebird');

module.exports = function(server) {
  request(CLIENTS_URL, function handleResponse(error, _, body) {
    var Client = server.models.client;
    var clientsData = JSON.parse(body).clients;
    return Promise.map(clientsData, function saveClient(client) {
      return Client.upsert(client);
    });
  });
  request(POLICIES_URL, function handleResponse(error, _, body) {
    var Policy = server.models.policy;
    var policiesData = JSON.parse(body).policies;
    return Promise.map(policiesData, function savePolicy(client) {
      return Policy.upsert(client);
    });
  });
};
