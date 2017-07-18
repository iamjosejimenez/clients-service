'use strict';

const {ROLES} = require('../constants.json');

module.exports = function(server) {
  const Role = server.models.Role;
  ROLES.map(ROLE => {
    Role.registerResolver(ROLE, (role, context, next) => {
      const client = context.remotingContext.req.client;
      return next(null, client && client.role === ROLE);
    });
  });
};
