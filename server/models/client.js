'use strict';

module.exports = function(Client) {
  Client.disableRemoteMethodByName('create');
  Client.disableRemoteMethodByName('upsert');
  Client.disableRemoteMethodByName('deleteById');
  Client.disableRemoteMethodByName('updateAll');
  Client.disableRemoteMethodByName('prototype.updateAttributes');
  Client.disableRemoteMethodByName('createChangeStream');
};
