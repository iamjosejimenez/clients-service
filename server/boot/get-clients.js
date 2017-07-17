'use strict';

const {downloadData} = require('../services/data-downloader.js');
const Promise = require('bluebird');
const logger = require('../services/logger');

let roles = ['admin', 'user'];

module.exports = (server) => {
  server.enableAuth();

  const Role = server.models.Role;
  const RoleMapping = server.models.RoleMapping;
  return Promise.map(roles, name => {
    return Role.findOrCreate({
      name,
    });
  }).then(rolesCreated => {
    roles = rolesCreated;
    return downloadData(server);
  }).then(() => {
    const Client = server.models.client;
    return Client.find({});
  }).then(clients => {
    const adminRole = roles[0][0];
    const userRole = roles[1][0];
    return Promise.map(clients, client => {
      return RoleMapping.find({
        where: {
          principalType: RoleMapping.USER,
          principalId: client.id,
        },
      }).then(roleMapping => {
        if (!roleMapping.length) {
          if (client.role === 'admin') {
            return adminRole.principals.create({
              principalType: RoleMapping.USER,
              principalId: client.id,
            });
          } else {
            return userRole.principals.create({
              principalType: RoleMapping.USER,
              principalId: client.id,
            });
          }
        }
      });
    });
  }).catch(error => {
    logger.error(error);
  });
};
