'use strict';

function septonDirective(/* inject dependencies here, i.e. : $rootScope */) {
  return {
    restrict: 'E',
    bindToController: {},
    controller: SeptonController,
    controllerAs: 'septon',
    templateUrl: 'directives/septon/septon.html'
  };
}

SeptonController.$inject = ['$rootScope', '$gameConstants', '$mdDialog', 'saveGame'];
function SeptonController($rootScope, $gameConstants, $mdDialog, saveGame) {
  var vm = this;
  vm.tribute = 0;
  vm.onClick = _onClick;
  vm.buySepton = _buySepton;

  initialize();

  /////////////////////

  function initialize() {
    vm.septonCost = $gameConstants.SEPTON.COST;
  }

  function setMessage() {
    var message;
    var keys = window._.keys($gameConstants.SEPTON.TRIBUTE);
    for (var i = 0; i < keys.length; ++i) {
      if (vm.tribute.toString() <= keys[i]) {
        message = $gameConstants.SEPTON.TRIBUTE[keys[i]].MESSAGE;
        if($rootScope.game.septonMultiplier < $gameConstants.SEPTON.TRIBUTE[keys[i]].MULTIPLIER) {
          $rootScope.game.septonMultiplier = $gameConstants.SEPTON.TRIBUTE[keys[i]].MULTIPLIER;
        }
        return message;
      }
    }
  }

  function _onClick(ev) {
    $rootScope.game.totalGold -= vm.tribute;
    var message = setMessage();
    $mdDialog.show(
      $mdDialog.alert(ev)
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Message from the Septon')
        .textContent(message)
        .ariaLabel('Septon Message')
        .ok('Thank the gods')
        .targetEvent(ev)
    );
    saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function() {});
  }

  function _buySepton() {
    $rootScope.game.totalGold -= vm.septonCost;
    $rootScope.game.buildings.septon++;
    saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function() {});
  }

}

module.exports = septonDirective;
