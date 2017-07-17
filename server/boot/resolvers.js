'use strict';

module.exports = function(server) {
  const Role = server.models.Role;
  Role.registerResolver('admin', (role, context, next) => {
    const client = context.remotingContext.req.client;
    return next(null, client && client.role === 'admin');
  });
};
