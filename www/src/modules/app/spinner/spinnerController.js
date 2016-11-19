'use strict';

module.exports = /*@ngInject*/
  function spinnerController($mdDialog, $rootScope) {
    var vm = this;

    $rootScope.$on("hide_wait", function (event, args) {
      $mdDialog.cancel();
    });
  };
