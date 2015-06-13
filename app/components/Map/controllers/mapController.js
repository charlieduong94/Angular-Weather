angular.module("WeatherMap").controller("MapController", function($scope, uiGmapGoogleMapApi){
  $scope.markers= [];
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  uiGmapGoogleMapApi.then(function(maps) {
    console.log("map loaded");
  });
  
});