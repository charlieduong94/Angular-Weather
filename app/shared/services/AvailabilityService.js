angular.module("SharedElements").service("AvailabilityService", function(){
  var service = this;
  service.located = false;    // checks if located or not
  service.connected = false;
  service.loading = true;
});