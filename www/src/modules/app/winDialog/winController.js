'use strict';

module.exports = /*@ngInject*/
  function homeController($mdDialog, deleteGame, $rootScope, createGame, GameInfo, $q, userMe) {
    var vm = this;
    vm.restart = function () {
      deleteGame.remove({gameId: $rootScope.user.gameId}).$promise.then(function () {
        createGame.startGame({userId: $rootScope.user._id}, {houseName: $rootScope.game.houseName}).$promise.then(function () {
          userMe.me().$promise.then(function (data) {
            $rootScope.user = data.message;
            GameInfo.get({gameId: $rootScope.user.gameId}).$promise.then(function (data) {
              $rootScope.game = data.message;
              vm.totalGold = $rootScope.game.totalGold;
              $mdDialog.cancel();
            });
          });
        });
      });

    };
  };
