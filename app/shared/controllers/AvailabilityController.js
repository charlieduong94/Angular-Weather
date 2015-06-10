angular.module('SharedElements').controller("AvailabilityController", function($scope, AvailabilityService){
  $scope.located = AvailabilityService.located;
  $scope.loading = AvailabilityService.loading;
  // watch for changes
  $scope.$watch(function () { return AvailabilityService.located; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.located = AvailabilityService.located;
      }
  });
  $scope.$watch(function () { return navigator.onLine; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.connected = navigator.onLine;
          AvailabilityService.connected = navigator.onLine;
      }
  });
  $scope.$watch(function () { return AvailabilityService.loading; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.loading = AvailabilityService.loading;
      }
  });
  $scope.isLocated = function(){
    return $scope.located;
  };
  $scope.isConnected = function(){
    return $scope.connected;
  };
  $scope.isLoading = function(){ 
    return $scope.loading;
  };
 
  
});
