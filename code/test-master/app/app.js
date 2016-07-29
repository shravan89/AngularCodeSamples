define(['angular', "angularRoute", "geolocation/geolocation"], function (angular, angularRoute, geolocation) {

'use strict';
  
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.geolocation',
]);

  app.init = function () {
    angular.bootstrap(document, ['myApp']);
  };

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/geolocation'});
}]);

  return app;
});