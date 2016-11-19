'use strict';

module.exports = /*@ngInject*/
function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'loginController',
        controllerAs: 'login',
        resolve: {
          skipIfLoggedIn:function ($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
              deferred.reject();
            } else {
              deferred.resolve();
            }
            return deferred.promise;
          }
        }
      })

      .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'app/layout.html',
        controller: 'appController',
        controllerAs: 'app',
        resolve: {
          loginRequired:function ($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
              deferred.resolve();
            } else {
              $location.path('/login');
            }
            return deferred.promise;
          }
        }
      })

      .state('app.home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'homeController',
        controllerAs: 'home'
      });
  };
