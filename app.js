(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('CityController', CityController)
.service('CityService', CityService)
.filter('dateFilter', dateFilterFactory)
.filter('unitFilter', unitFilterFactory)
.constant('ApiBasePath', "https://weather-widget-blindpupil.c9users.io/api.JSON");

var APIlink = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=bdd0f8bac1c71172d94ac71ff7b8aeab"; 


CityController.$inject = ['CityService', '$filter', 'dateFilter'];
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
  
  getCity.units = ""; 
  
  getCity.changeUnit = function(){
    if (getCity.units == false) {
      getCity.units = true; 
      
    } else {
      getCity.units = false;  
      }
  };
  
  var promise = CityService.getWeather();
  
  promise.then(function(response){
    getCity.weather = response.data;
    console.log(getCity.weather);
  })
  .catch(function(error){
    console.log("Something didn't work");
  });

 
}


//Filter to fix date
function dateFilterFactory() {
  return function(input) {
    input = input * 1000;
    return input;
  };
}

//Imperial unit filter
function unitFilterFactory() {
  return function(temp) {
    temp = ((temp * 9) / 5) + 32
    return temp;
  };
}


CityService.$inject = ['$http', 'ApiBasePath'];
function CityService($http, ApiBasePath) {
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
      url: (ApiBasePath)
    });
    return response;
  };

}
})();
