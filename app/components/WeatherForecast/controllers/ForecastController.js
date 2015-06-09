angular.module('Forecast').controller("ForecastController", function($scope, WeatherFactory, GeolocationFactory, UnitToggleService, IconMappingService){
  $scope.unit = UnitToggleService.unit;
  $scope.getIcon = IconMappingService;
  $scope.$watch(function () { return UnitToggleService.unit; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.unit = UnitToggleService.unit;
      }
  });
  $scope.type = "Hourly";
  $scope.init = function(type){
    $scope.type = type;
  };
  GeolocationFactory.getLocation().then(function(data){
    WeatherFactory.getWeather($scope.type, data.lat, data.lon).then(function(data){
      $scope.weatherList = data.data.list;
    });
  });
});