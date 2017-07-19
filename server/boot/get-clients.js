'use strict';

const {downloadData} = require('../services/data-downloader.js');
const Promise = require('bluebird');
const logger = require('../services/logger');

let {ROLES} = require('../constants.json');

module.exports = (server) => {
  server.enableAuth();

  const Role = server.models.Role;
  const RoleMapping = server.models.RoleMapping;
  const Client = server.models.client;

  return Promise.map(ROLES, name => {
    return Role.findOrCreate({
      name,
    });
  }).then(rolesCreated => {
    ROLES = rolesCreated;
    return downloadData(server);
  }).then(() => {
    return Client.findOrCreate({
      email: 'admin@admin.com',
      role: 'admin',
      id: 'admin',
      name: 'admin',
    });
  }).then(() => {
    return Client.find({});
  }).then(clients => {
    return Promise.map(clients, client => {
      return RoleMapping.find({
        where: {
          principalType: RoleMapping.USER,
          principalId: client.id,
        },
      }).then(roleMapping => {
        if (!roleMapping.length) {
          Promise.any(ROLES, ROLE => {
            if (client.role === ROLE.name) {
              return ROLE.principals.create({
                principalType: RoleMapping.USER,
                principalId: client.id,
              });
            }
            return Promise.reject();
          });
        }
        return Promise.resolve();
      });
    });
  }).catch(error => {
    logger.error(error);
  });
};
