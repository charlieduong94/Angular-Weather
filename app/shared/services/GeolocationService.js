// returns an object containing information about the current location 
angular.module('Forecast').service("GeolocationService", function($q){
    var service = this;
    service.getLocation = function(){
      var deferred = $q.defer();
      if(navigator.geolocation){
        var lat, lon;
        navigator.geolocation.getCurrentPosition(function(position){
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          deferred.resolve({serviceEnabled : true, lat : position.coords.latitude, lon : position.coords.longitude});
        });
      }
      else{
        deferred.reject({serviceEnabled : false});
      }
      return deferred.promise;
    };

});