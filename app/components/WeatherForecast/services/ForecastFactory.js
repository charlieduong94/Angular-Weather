// returns a promise object which will be paired with the 'then' function
angular.module('Forecast').factory("WeatherFactory", function($http){
  return {
    getWeather : function(service, lat, lon){
      var url;
      switch(service){
        case "Hourly":
          url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon=' + lon 
                + "&cnt=20&mode=json";
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
          //url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon;
          url = "https://api.forecast.io/forecast/6690b4daa6a7f1365438e88938ef8362/"+ lat + "," + lon;
          break;
      }
      return $http.get(url);
    }
  };
});

