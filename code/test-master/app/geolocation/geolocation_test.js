'use strict';

describe('geolocationCtrl', function() {
  beforeEach(module('myApp.geolocation'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Geolocation', function() {
    it('Test Geolocation Controlled to be defined', function() {
      var $scope = {};
      var controller = $controller('geolocationCtrl', { $scope: $scope });
      expect(controller).toBeDefined();
    });

    it('Test valid url - validateTextField', function() {
      var $scope = {};
      var controller = $controller('geolocationCtrl', { $scope: $scope });
      $scope.domain = "www.colorado.com";
      expect($scope.validateTextField($scope.domain)).toBe(true);
    });
  });
});