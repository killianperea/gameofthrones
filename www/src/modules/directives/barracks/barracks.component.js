'use strict';

function barracksDirective(/* inject dependencies here, i.e. : $rootScope */) {
  return {
    restrict: 'E',
    bindToController: {},
    controller: BarracksController,
    controllerAs: 'barracks',
    templateUrl: 'directives/barracks/barracks.html'
  };
}

BarracksController.$inject = ['$rootScope','$gameConstants', '$mdDialog', '$mdToast', 'saveGame'];
function BarracksController($rootScope, $gameConstants, $mdDialog, $mdToast, saveGame) {
  var vm = this;
  vm.soldierCost = $gameConstants.BARRACKS.TRAIN_COST;
  vm.createSoldier = _createSoldier;
  vm.buyBarracks = _buyBarracks;
  vm.showCreateSoldiersDialog = _showCreateSoldiersDialog;

  initialize();

  /////////////////////

  function initialize() {
    vm.barracksCost = $gameConstants.BARRACKS.COST;
  }

  function _createSoldier() {
    $rootScope.game.totalGold -= vm.soldierCost;
    $rootScope.game.soldiers++;
  }

  function _buyBarracks() {
    $rootScope.game.totalGold -= vm.barracksCost;
    $rootScope.game.buildings.barracks++;
    saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function() {});
  }

  function _showCreateSoldiersDialog() {
    $mdDialog.show({
      controller: _trainSoldiersDialogController,
      templateUrl: 'directives/barracks/barracks.dialog.html',
      clickOutsideToClose:true
    });
  }

  function _trainSoldiersDialogController($scope, $rootScope, $mdDialog) {
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.trainSoldiers = function() {
      var soldiersToTrain = parseInt($scope.training.soldiersToTrain);
      if ($rootScope.game.totalGold < soldiersToTrain * $gameConstants.BARRACKS.TRAIN_COST) {
        _showSimpleToast('Not enough gold to train');
      } else {
        $rootScope.game.soldiers += soldiersToTrain;
        $rootScope.game.totalGold -= soldiersToTrain * $gameConstants.BARRACKS.TRAIN_COST;
        _showSimpleToast(soldiersToTrain + ' more soldiers ready to fight');
        $mdDialog.hide();
        saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function() {});
      }
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

module.exports = barracksDirective;
