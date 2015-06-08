// controller for current weather
angular.module('SharedElements').service("UnitToggleService", function(){
  var service = {};
  service.unit = "fahrenheit";
  return service;
});
