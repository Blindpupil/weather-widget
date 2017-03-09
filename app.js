(function () {
'use strict';

angular.module('WeatherApp', [])
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://api.openweathermap.org/data/2.5/forecast/**'
    ]);
}])         //the call will not work from a https to the http api...
.controller('WeatherController', WeatherController)
.service('WeatherService', WeatherService)
.filter('dateFilter', dateFilterFactory)
.filter('unitFilter', unitFilterFactory)
.constant('ApiBaseUrl', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' )
.constant('ApiKey', "&mode=JSON&units=metric&cnt=7&APPID=bdd0f8bac1c71172d94ac71ff7b8aeab");

WeatherController.$inject = ['$http', 'ApiBaseUrl', 'ApiKey', 'WeatherService', '$filter', 'dateFilter'];
function WeatherController($http, ApiBaseUrl, ApiKey, WeatherService, $filter, dateFilter) {
  var weatherData = this;

  weatherData.isFirstStep = true;

  weatherData.cityName = '';

  weatherData.fetchData = function() {

    weatherData.icon = "";

    weatherData.response = null;

    $http({method: 'GET', url: ApiBaseUrl + weatherData.cityName.toLowerCase() + ApiKey})
      .then(function(response){
        weatherData.status = response.status;
        weatherData.data = response.data;

        weatherData.getIcon = function() {
          var mainDescription = weatherData.data.list[0].weather[0].main;

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
        weatherData.getIcon();

      }, function(response) {
        weatherData.data = response.data || 'Request failed';
        weatherData.status = response.status;
      });

  };


  weatherData.fetchCoordWeather = function() {
    weatherData.isFirstStep = false;

    weatherData.icon = "";

    weatherData.response = null;

    function getPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          weatherData.currentPosition = position;
          console.log(weatherData.currentPosition.coords.latitude);

          $http({method: 'GET', url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + weatherData.currentPosition.coords.latitude + '&lon=' + weatherData.currentPosition.coords.longitude + ApiKey})
          .then(function(response){
            weatherData.status = response.status;
            weatherData.data = response.data;

            weatherData.getIcon = function() {
              var mainDescription = weatherData.data.list[0].weather[0].main;

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
            weatherData.getIcon();

          }, function(response) {
            weatherData.data = response.data || 'Request failed';
            weatherData.status = response.status;
          });

        });
      }
    };
    getPosition();

  };


  weatherData.addCity = function(cityName) {
    WeatherService.addCity(weatherData.cityName);
    weatherData.isFirstStep = false;
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


WeatherService.$inject = [];
function WeatherService() {
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

}
})();
