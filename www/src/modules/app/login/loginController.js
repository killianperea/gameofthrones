'use strict';

module.exports = /*@ngInject*/
  function loginController($auth, $state, $mdDialog, $mdToast, $rootScope, $q) {
    var vm = this;

    vm.doLogin = function () {
      showWait();
      $auth.login(vm.user)
        .then(function () {
          hideWait();
          $state.go('app.home');
        }, function () {
          hideWait().then(function () {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Error on login')
                .position('top right')
                .hideDelay(3000)
            );
          });
        });
    };

    vm.doRegistration = function () {
      $mdDialog.show({
        templateUrl: 'app/login/registration-user/registrationUser.html',
        clickOutsideToClose: false,
        disableParentScroll: true,
        controller: 'registrationController',
        controllerAs: 'registration'
      });
    };

    function hideWait() {
      var deferred = $q.defer();
      setTimeout(function () {
        $rootScope.$emit("hide_wait");
        deferred.resolve();
      }, 5);
      return deferred.promise;
    }

    function showWait() {
      $mdDialog.show({
        controller: 'spinnerController',
        controllerAs: 'spinner',
        templateUrl: 'app/spinner/spinner.html',
        parent: angular.element(document.body),
        clickOutsideToClose: false,
        fullscreen: false
      });
    }
  };
