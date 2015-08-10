angular.module('SharedElements').controller("ModalController", function($scope, $modal, AvailabilityService){

  $scope.$watch(function(){
    return (!AvailabilityService.connected || !AvailabilityService.located) && !AvailabilityService.loading;},
    function(newVal, oldVal){
      if(newVal === true){
        $modal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          size: 'sm',
          controller : "ErrorModalController",
          backdrop: 'static',
          keyboard: false
        });
      }
    });
    
  
});
