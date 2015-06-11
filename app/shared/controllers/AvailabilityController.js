angular.module('SharedElements').controller("AvailabilityController", function($scope, AvailabilityService){
  // watch for changes
  
  $scope.$watch(function () { return navigator.onLine; }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
          $scope.connected = navigator.onLine;
          AvailabilityService.connected = navigator.onLine;
          console.log(AvailabilityService.connected);
          console.log(AvailabilityService.located);
          console.log(AvailabilityService.loading);
      }
  });
  
  $scope.isLocated = function(){
    return AvailabilityService.located;
  };
  $scope.isConnected = function(){
    return AvailabilityService.connected;
  };
  $scope.isLoading = function(){ 
    return AvailabilityService.loading;
  };
 
  
});
