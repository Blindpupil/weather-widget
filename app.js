(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('CityController', CityController)
.service('CityService', CityService);

CityController.$inject = ['CityService']
function CityController(CityService) {
  
}

CityService.$inject = ['$http']
function CityService($http) {
  var service = this;

  // service.getCity
}


})();
