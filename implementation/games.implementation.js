var Game = require('../schemas/gameSchema');
var User = require('../schemas/userSchema');
var Deferred = require('promised-io').Deferred;
var serverConstants = require('../constants/application');
var _ = require('underscore');
var mongoose = require('mongoose');

var _getGame = function(gameId) {
    'use strict';
    var deferred = new Deferred();
    Game.findById(gameId, function (error, game) {
        if (error || !game) {
            deferred.reject(serverConstants.CODE['500']);
        } else {
            deferred.resolve(game);
        }
    });
    return deferred.promise;
};

var _createGame = function (userId, _game) {
    'use strict';
    var deferred = new Deferred();
    var game = new Game({
        houseName: _game.houseName
    });
    User.findById(userId, function (error, user) {
        if(error) {
            deferred.reject(serverConstants.CODE['500']);
        } else if (!user) {
            deferred.reject(serverConstants.CODE['500']);
        } else {
            game.save(function (error, game) {
                if (error) {
                    deferred.reject(serverConstants.CODE['500']);
                } else {
                    user.update({ $set: {gameId: game._id}}, function (error) {
                        if (error) {
                            deferred.reject(serverConstants.CODE['500']);
                        } else {
                            deferred.resolve();
                        }
                    });
                }
            });
        }
    });
    return deferred.promise;
};

var _modifyGame = function (gameId, _game) {
    'use strict';
    var deferred = new Deferred();
    Game.findById(gameId, function (error, game) {
        if(error) {
            deferred.reject(serverConstants.CODE['500']);
        } else if(game === null) {
            deferred.reject(serverConstants.CODE['500']);
        } else  {
            var keyUser = Object.keys(_game),
                gameUpdate = {$set:{}};
            _.each(keyUser, function (key) {
                gameUpdate['$set'][key] = _game[key];
            });
            game.update(gameUpdate, function (error, gameUpdated) {
                if (error) {
                    deferred.reject(serverConstants.CODE['500']);
                } else {
                    deferred.resolve(gameUpdated._id);
                }
            });
        }
    });
    return deferred.promise;
};

var _removeGame = function (gameId) {
    'use strict';
    var deferred = new Deferred();
    Game.findById(gameId, function (error, game) {
        if(error) {
            deferred.reject(serverConstants.CODE['500']);
        } else if(game === null) {
            deferred.reject(serverConstants.CODE['500']);
        } else  {
            Game.remove({_id: mongoose.Types.ObjectId(gameId)}, function (error) {
                if (error) {
                    deferred.reject(serverConstants.CODE['500']);
                } else {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
};

module.exports = {
    getGame: _getGame,
    createGame: _createGame,
    modifyGame: _modifyGame,
    removeGame: _removeGame
};