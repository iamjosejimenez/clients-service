'use strict';

const server = require('../server');

module.exports = () => {
  return (req, res, next) => {
    let authorization = req.get('Authentication');
    const Client = server.models.client;

    if (/^\/explorer/.test(req.url)) {
      authorization = 'admin@admin.com';
    }

    Client.findOne({
      where: {
        email: authorization ? authorization : '',
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
