'use strict';

module.exports =
  angular.module('app.component.resources', [])
    .provider('userMe', require('./users-resources/user.resources').userMeProvider)
    .provider('createUser', require('./users-resources/user.resources').createUserProvider)
    .provider('createGame', require('./game-resources/game.resources').createGameProvider)
    .provider('GameInfo', require('./game-resources/game.resources').getGameProvider)
    .provider('saveGame', require('./game-resources/game.resources').saveGameProvider)
    .provider('deleteGame', require('./game-resources/game.resources').deleteGameProvider);
