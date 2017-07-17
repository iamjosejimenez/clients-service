'use strict';

const server = require('../server');

module.exports = () => {
  return (req, res, next) => {
    const authorization = req.get('Authentication');
    const Client = server.models.client;
    Client.findOne({
      where: {
        email: authorization,
      },
    }, (error, client) => {
      if (error) {
        return next(error);
      }

      if (!client) {
        const authorizationError = new Error('Unauthorized');
        authorizationError.status = 401;
        return next(authorizationError);
      }
      req.client = client;
      return next();
    });
  };
};
