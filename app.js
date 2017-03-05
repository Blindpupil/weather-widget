(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('CityController', CityController)
.service('CityService', CityService);

CityController.$inject = ['CityService']
function CityController(CityService) {
  var getCity = this;
  
  getCity.cityName = "";
  
  getCity.addCity = function() {
    CityService.addCity(getCity.cityName);
  }
}

function CityService(){
  var service = this;
  var city = "";
  
  service.addCity = function(cityName) {
    city = cityName;
  };
}

})();
