'use strict';

function familiesDirective(/* inject dependencies here, i.e. : $rootScope */) {
  return {
    restrict: 'E',
    bindToController: {},
    controller: FamiliesController,
    controllerAs: 'families',
    templateUrl: 'directives/families/families.html'
  };
}

FamiliesController.$inject = ['$rootScope', '$gameConstants', '$mdDialog', '$mdToast'];
function FamiliesController ($rootScope, $gameConstants, $mdDialog, $mdToast) {
  var vm = this;
  vm.showBeforeFightDialog = _showBeforeFightDialog;

  initialize();

  /////////////////////

  function initialize() {
    vm.families = _getFamilies(); //it already refresh vm.families
  }

  function _getFamilies() {
    var _ = window._;
    var _families = $gameConstants.FAMILIES;
    _.each(_families, function (family) {
      //LOOK IF FAMILY IS ALREADY DEFEATED
      var familyAlreadyDefeated = false;
      family.alreadyDefeated = familyAlreadyDefeated;
    });
    return _families;
  }

  /* BEFORE FIGHT DIALOG MANAGEMENT */
  function _showBeforeFightDialog(familyName) {
    $mdDialog.show({
      controller: _beforeFightDialogController,
      templateUrl: 'directives/families/families.beforeFighting.dialog.html',
      locals: {
        familyName: familyName
      },
      clickOutsideToClose:true
    });
  }

  function _beforeFightDialogController($scope, $rootScope, $mdDialog, familyName, $mdToast) {
    var marketDiscount = 0;
    if ($rootScope.game.buildings.market) {
      marketDiscount = $gameConstants.MARKET[$rootScope.game.buildings.market + ''].SAVE_PERCENT / 100;
    }
    $scope.familyGoldCost = parseInt($gameConstants.FAMILIES[familyName.toUpperCase()].COST * (1-marketDiscount));
    var familySoldiersCost = $gameConstants.FAMILIES[familyName.toUpperCase()].SOLDIERS;
    $scope.familyName = familyName;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.fight = function() {
      var soldiersToRisk = parseInt($scope.beforeFight.soldiersToRisk);
      if ($rootScope.game.totalGold < $scope.familyGoldCost) {
        _showSimpleToast('Not enough gold to challenge');
      } else if ($rootScope.game.soldiers < soldiersToRisk) {
        _showSimpleToast('You do not own that much soldiers');
      } else {
        if (soldiersToRisk * $rootScope.game.septonMultiplier < familySoldiersCost) { //loosing fight
          $rootScope.game.totalGold -= $scope.familyGoldCost;
          _showAfterFightDialog(familyName, {
            playerWon: false,
            soldiersLost: soldiersToRisk
          });
        } else { //winning fight
          $rootScope.game.familiesDefeated[familyName] = true;
          _showAfterFightDialog(familyName, {
            playerWon: true,
            soldiersLost: parseInt((Math.random() / 2) * soldiersToRisk)
          });
        }
        $rootScope.game.septonMultiplier = 0;
      }
    };
  }

  /* AFTER FIGHT DIALOG MANAGEMENT */
  function _showAfterFightDialog(familyName, fightResult) {
      $rootScope.game.soldiers -= fightResult.soldiersLost;
      $mdDialog.show({
      controller: _afterFightDialogController,
      templateUrl: 'directives/families/families.afterFighting.dialog.html',
      locals: {
        familyName: familyName,
        fightResult: fightResult
      },
      clickOutsideToClose:true
    });
  }

  function _afterFightDialogController($scope, $mdDialog, familyName, fightResult) {
    $scope.playerWon = fightResult.playerWon;
    $scope.soldiersLost = fightResult.soldiersLost;
    $scope.familyName = familyName;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function _showSimpleToast(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('bottom right')
        .hideDelay(3000)
    );
  }
}

module.exports = familiesDirective;
