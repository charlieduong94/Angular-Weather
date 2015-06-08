// returns a promise object which will be paired with the 'then' function
angular.module('WeatherApp').factory("WeatherFactory", function($http){
  return {
    getWeather : function(service, lat, lon){
      var url;
      switch(service){
        case "Hourly":
          url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon=' + lon 
                + "&mode=json";
          break;
        case "7-Day":
          url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ lat +'&lon=' + lon 
                + "&cnt=7&mode=json";
          break;
        case "16-Day":
          url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ lat +'&lon=' + lon 
                + "&cnt=16&mode=json";
          break;
        default: // current weather
          url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon;
          break;
      }
      return $http.get(url);
    }
  };
});
// returns an object containing information about the current location 
angular.module('WeatherApp').factory("GeolocationFactory", function($q){
  return {
    getLocation : function(){
      var deferred = $q.defer();
      if(navigator.geolocation){
        var lat, lon;
        navigator.geolocation.getCurrentPosition(function(position){
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          deferred.resolve({serviceEnabled : true, lat : position.coords.latitude, lon : position.coords.longitude});
        });
      }
      else{
        deferred.reject({serviceEnabled : false});
      }
      return deferred.promise;
    }
  };
});

angular.module('WeatherApp').service("IconMappingService", function(){
  var openWeatherNames = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d',                          
                          '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
  var weatherIconClasses = ['wi-day-sunny', 'wi-night-clear', 'wi-day-cloudy', 'wi-night-cloudy',
                            'wi-cloudy', 'wi-cloudy', 'wi-cloudy', 'wi-cloudy', 'wi-rain', 'wi-rain',
                            'wi-day-rain', 'wi-night-rain', 'wi-thunderstorm', 'wi-thunderstorm', 
                            'wi-snow', 'wi-snow', 'wi-fog', 'wi-fog'];
  return function(iconName){
    return weatherIconClasses[openWeatherNames.indexOf(iconName)];
  };
                        
});
// controller for current weather
angular.module('WeatherApp').service("UnitToggleService", function(){
  var service = {};
  service.unit = "fahrenheit";
  return service;
  
});
