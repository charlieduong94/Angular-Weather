angular.module('SharedElements').controller("AvailabilityController", function($scope, AvailabilityService){
  // watch for changes
  
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
