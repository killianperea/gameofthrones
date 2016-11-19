'use strict';

module.exports = /*@ngInject*/
  function homeController($interval, $rootScope) {
    var vm = this;

    $rootScope._intervalGoldPromise = $interval(function () {
      $rootScope.game.totalGold += $rootScope.game.goldRate;
    }, 1000);
  };
