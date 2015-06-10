angular.module("SharedElements").service("AvailabilityService", function(){
  var service = {};
  service.located = false;    // checks if located or not
  service.loading = true;
  return service;
});