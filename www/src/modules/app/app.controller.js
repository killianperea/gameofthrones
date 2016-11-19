'use strict';

module.exports = /*@ngInject*/
  function appController($rootScope, $auth, userMe, $mdToast, $mdSidenav, $mdBottomSheet, $q, $state, GameInfo, $interval, saveGame, $mdDialog, $scope) {
    var vm = this;
    vm.logout = logout;
    vm.toggleRightSidebar = toggleRightSidebar;

    inicialize();

    function inicialize() {
      userMe.me().$promise.then(function (data) {
        $rootScope.user = data.message;
        vm.currentUserName = data.message.username;
        getGameAndStartInterval();
      }, function () {
        $auth.logout();
        $mdToast.show(
          $mdToast.simple()
            .textContent('Internal Server Error')
            .position('top right')
            .hideDelay(3000)
        );
      });

    function getGameAndStartInterval() {
      GameInfo.get({gameId: $rootScope.user.gameId}).$promise.then(function (data) {
        delete data.message._id;
        $rootScope.game = data.message;
        vm.totalGold = $rootScope.game.totalGold;
        $rootScope._saveGameInterval = $interval(function () {
          saveGame.save({gameId: $rootScope.user.gameId}, $rootScope.game).$promise.then(function () {
          });
        }, 5000);
      });
    }

      $scope.$watch('game.familiesDefeated', function (newValue) {
        var families = window._.keys(newValue);
        var count = 0;
        for(var i = 0; i < families.length; ++i) {
          if (newValue[families[i]]) {
            count ++;
          }
        }
        if(count === 8) {
          $mdDialog.show({
            controller: 'winController',
            controllerAs: 'win',
            templateUrl: 'app/winDialog/win.html',
            clickOutsideToClose:false
          });
        }
      });
    }

    function toggleRightSidebar() {
      $mdSidenav('left').toggle();
    }

    function logout() {
      $auth.logout();
      $interval.cancel($rootScope._intervalGoldPromise);
      $interval.cancel($rootScope._saveGameInterval);
      $rootScope.user = undefined;
      $rootScope.game = undefined;
      $state.go('login');
    }
  };
