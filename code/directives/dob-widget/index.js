'use strict';

var dobWidget = require('./dob-widget.directive');


module.exports = angular.module('sc.common')
  .directive('dobWidget', dobWidget);
