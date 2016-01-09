// returns a promise object which will be paired with the 'then' function
angular.module('Forecast').factory("WeatherFactory", function($http){
  return {
    getWeather : function(service, lat, lon){
      return $http({
        url: "http://charlie-duong.com/weather/forecast", 
        method: "GET",
        params: {lat : lat, lon : lon}
     });
    }
  };
});
