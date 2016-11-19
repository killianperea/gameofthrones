'use strict';

function gamblingHallDirective(/* inject dependencies here, i.e. : $rootScope */) {
  return {
    restrict: 'E',
    bindToController: {},
    controller: GamblingHallController,
    controllerAs: 'gamblingHall',
    templateUrl: 'directives/gambling-hall/gambling-hall.html'
  };
}

GamblingHallController.$inject = ['$rootScope', '$gameConstants', '$mdDialog', 'saveGame'];
function GamblingHallController($rootScope, $gameConstants, $mdDialog, saveGame) {
  var vm = this;
  vm.bet = 0;
  vm.onClick = _onClick;
  vm.buyGamblingHall = _buyGamblingHall;

  initialize();

  /////////////////////

  function initialize() {
    vm.gamblingHallCost = $gameConstants.GAMBLING_HALL.COST;
  }

  function _onClick(ev) {
    $rootScope.game.totalGold -= vm.bet;
    var random = Math.floor((Math.random() * 100));
    console.log(random%2);
    if(random%2) {
      $rootScope.game.totalGold += vm.bet * 2;
      $mdDialog.show(
        $mdDialog.alert(ev)
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Lady lucky smile')
          .textContent('You win the bet!')
          .ariaLabel('Bet Message')
          .ok('Easy')
          .targetEvent(ev)
      );
    } else {
      $mdDialog.show(
        $mdDialog.alert(ev)
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('RIP')
          .textContent('You lose the bet')
          .ariaLabel('Bet Message')
          .ok('FML')
          .targetEvent(ev)
      );
    }
    saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function() {});
  }

  function _buyGamblingHall() {
    $rootScope.game.totalGold -= vm.gamblingHallCost;
    $rootScope.game.buildings.gamblingHall++;
  }

}

module.exports = gamblingHallDirective;
