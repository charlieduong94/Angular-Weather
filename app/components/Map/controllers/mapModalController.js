angular.module("WeatherMap").controller("MapModalController", function($scope, $modalInstance){
  $scope.close = function(){
    $modalInstance.close();
  };
});