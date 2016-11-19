var createGameProvider = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '/rest/game/';
  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };
  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      startGame: {
        url: baseUrl + serviceBaseUrl + ':userId',
        method: 'POST'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};

var saveGameProvider = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '/rest/game/';
  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };
  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      save: {
        url: baseUrl + serviceBaseUrl + ':gameId',
        method: 'PUT'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};

var getGameProvider = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '/rest/game/';
  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };
  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      get: {
        url: baseUrl + serviceBaseUrl + ':gameId',
        method: 'GET'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};

var deleteGameProvider = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '/rest/game/';
  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };
  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      remove: {
        url: baseUrl + serviceBaseUrl + ':gameId',
        method: 'DELETE'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};


module.exports = {
  createGameProvider: createGameProvider,
  getGameProvider:getGameProvider,
  saveGameProvider: saveGameProvider,
  deleteGameProvider: deleteGameProvider
};
