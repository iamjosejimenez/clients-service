'use strict';

module.exports = function(Policy) {
  Policy.disableRemoteMethodByName('create');
  Policy.disableRemoteMethodByName('upsert');
  Policy.disableRemoteMethodByName('deleteById');
  Policy.disableRemoteMethodByName('updateAll');
  Policy.disableRemoteMethodByName('prototype.updateAttributes');
  Policy.disableRemoteMethodByName('createChangeStream');
};
