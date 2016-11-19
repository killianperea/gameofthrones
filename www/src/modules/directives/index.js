'use strict';

module.exports =
  angular.module('app.component.directives', [])
  .directive('gtHouses', require('./houses/houses.component'))
  .directive('gtFamilies', require('./families/families.component'))
  .directive('gtBarracks', require('./barracks/barracks.component'))
  .directive('gtSepton', require('./septon/septon.component'))
  .directive('gtGamblingHall', require('./gambling-hall/gambling-hall.component'))
  .directive('gtMarket', require('./market/market.component'));
