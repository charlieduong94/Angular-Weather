angular.module('Forecast').controller("CurrentWeatherController", 
            function($scope, WeatherFactory, GeolocationFactory, UnitToggleService, IconMappingService, AvailabilityService){
  $scope.unitToggle = UnitToggleService;
  
  $scope.toggleButtonText = "Switch to Celsius";
  var makeCurrentWeatherPromise = function(lat, lon){
    WeatherFactory.getWeather("currentWeather", lat, lon).then(function(data){  // uses then function allow the code to run after get weather completes
      // weather
      console.log("loading done, success");
      AvailabilityService.loading = false; //loading is done
      $scope.main = data.data.main;
      $scope.wind = data.data.wind;
      $scope.weather = data.data.weather[0];
      
      // location
      $scope.location = data.data.name;
    });
    
  };
  $scope.getIcon = IconMappingService;
  GeolocationFactory.getLocation().then(function(data){
    if(data.serviceEnabled ){
      AvailabilityService.located = true;
      makeCurrentWeatherPromise(data.lat, data.lon);
    }
    else{
      console.log("loading done, failed");
      AvailabilityService.located = false;
      AvailabilityService.loading = false;
    }
    
  });
  
});