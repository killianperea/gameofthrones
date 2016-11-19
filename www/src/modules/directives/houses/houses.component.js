'use strict';

function housesDirective(/* inject dependencies here, i.e. : $rootScope */) {
  return {
    restrict: 'E',
    bindToController: {},
    controller: HousesController,
    controllerAs: 'houses',
    templateUrl: 'directives/houses/houses.html'
  };
}

HousesController.$inject = ['$rootScope', '$gameConstants', 'saveGame'];
function HousesController($rootScope, $gameConstants, saveGame) {
  var vm = this;
  vm.housesCost = null;
  vm.levelUpHouses = _levelUpHouses;
  vm.maxOut = false;

  initialize();

  /////////////////////

  function initialize() {
    vm.maxOut = _checkMaxLevel();
    if (!vm.maxOut) {
      vm.housesCost = $gameConstants.HOUSES[$rootScope.game.buildings.houses + 1 + ''].COST;
    }
  }


  function _levelUpHouses() {
    var maxLevel = Object.keys($gameConstants.HOUSES).length;
    if ($rootScope.game.buildings.houses <= maxLevel && $rootScope.game.totalGold > vm.housesCost) {
      $rootScope.game.totalGold -= vm.housesCost;
      $rootScope.game.buildings.houses++;
      $rootScope.game.goldRate = $gameConstants.HOUSES[$rootScope.game.buildings.houses + ''].GOLD_RATE;
      vm.maxOut = _checkMaxLevel();
      if (!vm.maxOut) {
        vm.housesCost = $gameConstants.HOUSES[$rootScope.game.buildings.houses + 1 + ''].COST;
      }
      saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function () {
      });
    }
  }

  function _checkMaxLevel() {
    return ($rootScope.game.buildings.houses === Object.keys($gameConstants.HOUSES).length);
  }

}

module.exports = housesDirective;
