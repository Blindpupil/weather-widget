(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('CityController', CityController)
.service('CityService', CityService);


var APIlink = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=bdd0f8bac1c71172d94ac71ff7b8aeab"; 


CityController.$inject = ['CityService'];
function CityController(CityService, WeatherService) {
  var getCity = this;
  
  getCity.cityName = "";
  
  getCity.addCity = function() {
    CityService.addCity(getCity.cityName);
  };
  
  getCity.isFirstStep = true;
  
  getCity.showCity = function() {
    getCity.isFirstStep = false;
  };
  
  getCity.removeCity = function(itemIndex) {
    CityService.removeCity(itemIndex);
    getCity.isFirstStep = true;
  };
  
}


//Business logic below
function CityService(){
  var service = this;
  
  var city = [];

  service.addCity = function(cityName) {
    var thisCity = {
      name: cityName
    };
  city.push(thisCity);
  };

  service.removeCity = function(itemIndex) {
    city.splice(itemIndex, 1);
  };

  service.getCity = function() {
    return city;
  };
  
}
})();
