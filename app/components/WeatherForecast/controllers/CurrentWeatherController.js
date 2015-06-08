angular.module('Forecast').controller("CurrentWeatherController", function($scope, WeatherFactory, GeolocationFactory, UnitToggleService, IconMappingService){
  $scope.unit = UnitToggleService.unit;
  
  $scope.toggleButtonText = "Switch to Celsius";
  var makeCurrentWeatherPromise = function(lat, lon){
    WeatherFactory.getWeather("currentWeather", lat, lon).then(function(data){  // uses then function allow the code to run after get weather completes
      // weather
      console.log(data);
      $scope.main = data.data.main;
      $scope.wind = data.data.wind;
      $scope.weather = data.data.weather[0];
      
      // location
      $scope.location = data.data.name;
    });
    
  };
  $scope.toggleUnit = function(){
    console.log(UnitToggleService.unit);
    if(UnitToggleService.unit === "fahrenheit"){
      $scope.toggleButtonText = "Switch to Fahrenheit";
      UnitToggleService.unit = "celsius";
    }
    else{
      $scope.toggleButtonText = "Switch to Celsius";
      UnitToggleService.unit = "fahrenheit";
    }
  };
  $scope.getIcon = IconMappingService;
  // constantly watches to see if unit has changed, if it has, update scope's unit
  $scope.$watch(function () { return UnitToggleService.unit; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.unit = UnitToggleService.unit;
      }
  });
  GeolocationFactory.getLocation().then(function(data){
    makeCurrentWeatherPromise(data.lat, data.lon);
  });
  
});