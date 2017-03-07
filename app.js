(function () {
'use strict';

angular.module('WeatherApp', [])
.controller('WeatherController', WeatherController)
.service('WeatherService', WeatherService)
.filter('dateFilter', dateFilterFactory)
.filter('unitFilter', unitFilterFactory)
.constant('ApiBasePath', "https://weather-widget-blindpupil.c9users.io/");

var APIlink = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=bdd0f8bac1c71172d94ac71ff7b8aeab"; 


WeatherController.$inject = ['WeatherService', '$filter', 'dateFilter'];
function WeatherController(WeatherService, $filter, dateFilter) {
  var weatherData = this;
  
  weatherData.isFirstStep = true;
  
  weatherData.showCity = function(cityName) {
    
    var promise = WeatherService.getWeather(cityName);
    
    promise
    .then(function(response){
      weatherData.weather = response.data;
      weatherData.getIcon();
      
      console.log(weatherData.weather);
      })
      .catch(function(error){
        console.log("Something didn't work");
      });
      
    weatherData.isFirstStep = false;
    
  };
  
  weatherData.cityName = "";
  
  weatherData.addCity = function(cityName) {
    WeatherService.addCity(weatherData.cityName);
    console.log(weatherData.cityName);
  };
  
  
  weatherData.removeCity = function(itemIndex) {
    WeatherService.removeCity(itemIndex);
    weatherData.isFirstStep = true;
  };
  
  
  weatherData.units = ""; 
  
  weatherData.changeUnit = function(){
    if (weatherData.units == false) {
      weatherData.units = true; 
      
    } else {
      weatherData.units = false;  
      }
  };
  
  
  weatherData.icon = "";
  
  weatherData.getIcon = function() {
    var mainDescription = weatherData.weather.list[0].weather[0].main;
    
    switch(mainDescription) {
      case 'Rain':
        weatherData.icon = "rain";
        break;
      case 'Drizzle':
        weatherData.icon = "showers";
        break;
      case 'Clouds':
        weatherData.icon = "day-cloudy";
        break;
      case 'Snow':
        weatherData.icon = "snow";
        break;
      case 'Clear':
        weatherData.icon = "day-sunny";
        break;
      case 'Thunderstorm':
        weatherData.icon = "thunderstorm";
        break;
      case 'Extreme':
        weatherData.icon = "hurricane";
        break;
      case 'Additional':
        weatherData.icon = "cloudy-gusts";
        break;
      case 'Atmosphere':
        weatherData.icon = "fog";
        break;
               
      default:
        weatherData.icon = "meteor";
        console.log("Boom! I don't know what that main description is");
    }
  };
  
  weatherData.getPosition = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        weatherData.currentPosition = position;
        console.log(weatherData.currentPosition);
      });
    }
    return weatherData.currentPosition;
  };
  
  
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


WeatherService.$inject = ['$http', 'ApiBasePath'];
function WeatherService($http, ApiBasePath) {
  var service = this;
  
  var city = [];

  service.addCity = function(cityName) {
    var thisCity = {
      name: cityName
    };
  city.push(thisCity);
  };

  service.removeCity = function(itemIndex) {
    // city.splice(itemIndex, 1);
  };
  
  service.getWeather = function(cityName) {
    var response = $http({
      url: (ApiBasePath + cityName + '.JSON'),
      params: {
        name: cityName
      }
    });
    return response;
  };

}
})();
