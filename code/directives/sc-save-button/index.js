'use strict';

var saveButtonDirective = require('./sc-save-button.directive');

module.exports = angular.module('sc.common')

  .directive('scSaveButton', saveButtonDirective);

