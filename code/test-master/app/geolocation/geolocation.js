'use strict';
define([
  'angular',
  'angularRoute',
], function(angular) {
  angular.module('myApp.geolocation', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/geolocation', {
          templateUrl: 'geolocation/geolocation.html',
          controller: 'geolocationCtrl'
        });
      }])

      .controller('geolocationCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.ip = "";
        $scope.country = "";
        $scope.region = "";
        $scope.city = "";
        $scope.timezone = "";
        $scope.lat = "";
        $scope.long = "";
        $scope.domain = "";

        $scope.updateLocationDetails = function(data) {
          // var now = new Date();

          $scope.ip = data.query;
          $scope.country = data.country;
          $scope.region = data.regionName;
          $scope.city = data.city;
          $scope.timezone = data.timezone;
          $scope.lat = data.lat;
          $scope.long = data.lon;
          // $(".help").click(function(e) {
          //   var fieldName = $(e.currentTarget).closest('tr').find('.field_name').text();
          //   alert("This is your " + fieldName + " from ISP " + data.isp + " at " + now);
          // });
        }

        $scope.getMyLocation = function() {
          $http.get("http://ip-api.com/json/")
              .then(function(response) {
                var response = response.data;
                $scope.updateLocationDetails(response);
                if (mainMap !== null && mainMap !== undefined) {
                  $scope.setUserLocationOnMap(response);
                }
              });
        }

        $scope.resetLocationDetails = function() {
          $scope.updateLocationDetails({
            query: "0.0.0.0",
            country: "",
            regionName: "",
            city: "",
            timezone: "",
            lat: "",
            lon: ""
          });
          removeGoogleMarker();
        }


        /**
         This method removes the user marker on the map
         */
        function removeGoogleMarker() {
          mapMarkers[1].setMap(null);
          var markerTemp = mapMarkers[0];
          mapMarkers = [];
          mapMarkers.push(markerTemp);
        }



        var mainMap;
        var mapMarkers = [];

        /**
         This method validates the domain typed on the screen by the user,
         and only accepts domains like "www.nytimes.com", "nytimes.com" or "g1.com.br" or "www.g1.com.br".
         */
        $scope.validateTextField = function (textFieldValue) {

          if (textFieldValue.indexOf("http://") <= 0 && textFieldValue.indexOf("https://") <= 0) {
            var splittedDomain = [];
            splittedDomain = textFieldValue.split('.');

            if (splittedDomain.length === 2 && splittedDomain[1] === 'com') {
              return true;

            } else if (splittedDomain.length === 3 && splittedDomain[1] === 'com' && splittedDomain[2] === 'br' || splittedDomain.length === 3 && splittedDomain[0] === 'www' && splittedDomain[2] === 'com') {
              return true;

            } else if (splittedDomain.length === 4 && splittedDomain[0] === 'www' && splittedDomain[2] === 'com' && splittedDomain[3] === 'br') {
              return true;
            } else {
              return false;
            }
          }
        }
        /**
         This method creates an Async call, return a Json object containing the website's physical location
         and sets it on the map
         */
        function setWebSiteLocationOnMap(webSiteDomain) {
          $http.get("http://ip-api.com/json/" + webSiteDomain)
              .then(function(response) {
                var data = response.data;
                var latitudeSite = new google.maps.LatLng(data.lat, data.lon);
                var optionsSite = {
                  id: 'optionsSite',
                  zoom: 3,
                  center: latitudeSite
                }
                if (mainMap == null || mainMap == undefined) {
                  var map = new google.maps.Map(document.getElementById('googleMap'), optionsSite);
                  mainMap = map;
                }
                var marker = new google.maps.Marker({
                  id: 'serverLocation',
                  position: latitudeSite,
                  map: mainMap,
                  title: data.city
                });
                if (mapMarkers.length === 2) {
                  mapMarkers[0].setMap(null);
                  var markTemp = mapMarkers[1];
                  mapMarkers = [];
                  mapMarkers.push(marker);
                  mapMarkers.push(markTemp)
                } else if (mapMarkers.length === 1) {
                  mapMarkers[0].setMap(null);
                  mapMarkers = [];
                  mapMarkers.push(marker);
                } else {
                  mapMarkers.push(marker);
                }
              });
        }
        /**
         This method sets the user's physical location on the map
         */
        $scope.setUserLocationOnMap = function(data) {
          var latitudeUser = new google.maps.LatLng(data.lat, data.lon);
          var markerUser = new google.maps.Marker({
            id: 'userLocation',
            position: latitudeUser,
            map: mainMap,
            title: data.city
          });
          if (mapMarkers.length === 2) {
            var markTemp = mapMarkers[0];
            mapMarkers = [];
            mapMarkers.push(markTemp)
            mapMarkers.push(markerUser);
          } else {
            mapMarkers.push(markerUser);
          }
        }
        /**
         This method is called when the locate button is clicked on the screen
         */
        $scope.onClicked = function() {
          //Checks if the text field value is empty or not

          console.log($scope.domain);
          if ($scope.domain !== '') {
            //Validates the website domain
            var checkDomain = $scope.validateTextField($scope.domain);
            //If the domain is valid, the map will be created
            if (checkDomain) {
              setWebSiteLocationOnMap($scope.domain);
            } else {
              alert('Type a valid website domain.');
            }
          } else {
            alert('The website domain field can\'t be empty');
          }
        }



      }]);

});