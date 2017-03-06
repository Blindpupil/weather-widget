(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('CityController', CityController)
.service('CityService', CityService)
.filter('dateFilter', dateFilterFactory);


var APIlink = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=bdd0f8bac1c71172d94ac71ff7b8aeab"; 


CityController.$inject = ['CityService', '$filter', 'dateFilter' ];
function CityController(CityService, $filter, dateFilter) {
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
  
  var promise = CityService.getWeather();
  
  promise.then(function(response){
    getCity.weather = response.data;
    console.log(getCity.weather);
  })
  .catch(function(error){
    console.log("Something didn't work");
  });
  
  
  getCity.units = "metric";
  
  getCity.changeUnit = function() {
    if (getCity.units == "metric") {
      getCity.units = "imperial";
    } else {
        getCity.units = "metric";
      }
      console.log(getCity.units);
    }; 
 
}

//Filter to fix date
function dateFilterFactory() {
  return function(input) {
    input = input || "";
    input = input * 1000;
    return input;
  };
}


//Business logic below
CityService.$inject = ['$http'];
function CityService($http) {
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

  service.getWeather = function() {
    var response = $http({
      method: "GET",
      url: "https://weather-widget-blindpupil.c9users.io/api.JSON"
    });
    return response;
  };

}
})();
