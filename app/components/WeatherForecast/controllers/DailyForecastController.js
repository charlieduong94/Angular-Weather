angular.module('Forecast').controller("DailyForecastController", function($scope, WeatherFactory, GeolocationFactory, UnitToggleService, IconMappingService){
  $scope.unit = UnitToggleService.unit;
  $scope.getIcon = IconMappingService;
  $scope.$watch(function () { return UnitToggleService.unit; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.unit = UnitToggleService.unit;
      }
  });
  GeolocationFactory.getLocation().then(function(data){
    WeatherFactory.getWeather("7-Day", data.lat, data.lon).then(function(data){
      $scope.weatherList = data.data.list;
    });
  });
});