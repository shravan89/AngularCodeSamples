'use strict';

var validationMessages = require('./validation.directive');

module.exports = angular.module('sc.common')

  .directive('validationMessages', validationMessages);
