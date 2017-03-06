(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('CityController', CityController)
.controller('ShowCityController', ShowCityController)
.service('CityService', CityService);


var APIlink = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=bdd0f8bac1c71172d94ac71ff7b8aeab"; 


CityController.$inject = ['CityService'];
function CityController(CityService) {
  var getCity = this;
  
  getCity.cityName = "";
  
  getCity.addCity = function() {
    CityService.addCity(getCity.cityName);
    console.log(getCity.cityName);
  };
}

ShowCityController.$inject = ['CityService'];
function ShowCityController(CityService) {
  var showCity = this; 
  
  showCity.city = CityService.getCity();
  
  showCity.removeCity = function(itemIndex) {
    CityService.removeCity(itemIndex);
  };
  
}


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
