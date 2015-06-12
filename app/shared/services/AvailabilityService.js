angular.module("SharedElements").service("AvailabilityService", function($modal, TimeoutService){
  var service = this;
  service.observers = [];
  service.located = false;    // checks if located or not
  service.connected = navigator.onLine;
  service.loading = true;
  
  TimeoutService.registerCallback(function(){
    console.log("availability callback");
    if(service.loading){ // if still loading
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