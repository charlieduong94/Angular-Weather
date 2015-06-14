angular.module('Forecast').controller("ForecastController", 
            function($scope, WeatherFactory, GeolocationService, UnitToggleService,
                      IconMappingService, AvailabilityService, TimeoutService){
  var makeCurrentWeatherPromise = function(lat, lon){
    WeatherFactory.getWeather("currentWeather", lat, lon).then(function(data){  // uses then function allow the code to run after get weather completes
      // weather
      console.log(data);
      console.log("loading done, success");
      AvailabilityService.loading = false; //loading is done
      
      console.log("loading = " + AvailabilityService.loading);
      console.log("connected = " + AvailabilityService.connected);
      console.log("located = " + AvailabilityService.located);
      $scope.currently = data.data.currently;
      $scope.hourly = data.data.hourly;
      $scope.daily = data.data.daily;
      
      var skycons = new Skycons({color : 'white'});
      setTimeout(function(){
        skycons.add(document.getElementById("mainIcon"),$scope.currently.icon);
      // very last thing to do is play the icons
      for(var i = 0; i < $scope.hourly.data.length; i++){
        skycons.add(document.getElementById("hourlySkycon" + i), $scope.hourly.data[i].icon);
        console.log("added");
      }
      for(var j = 0; j < $scope.daily.data.length; j++){
        skycons.add(document.getElementById("dailySkycon" + j), $scope.daily.data[j].icon);
        console.log("added");
      }
      skycons.play();
      }, 100);
      
      // location
    });
    
  };
  console.log(document.domain);
  $scope.unitToggle = UnitToggleService;
  $scope.toggleButtonText = "Switch to Celsius";
  
  $scope.getIcon = IconMappingService;
  
  GeolocationService.getLocation().then(function(data){
    if(data.serviceEnabled ){
      AvailabilityService.located = true;
      makeCurrentWeatherPromise(data.lat, data.lon);
    }
    else{
      console.log("loading done, failed");
      AvailabilityService.located = false;
      AvailabilityService.loading = false;
    }
  });
  

  // after getting location, start timer
  TimeoutService.startTimer();
  // look into using chrome storage to store data
});