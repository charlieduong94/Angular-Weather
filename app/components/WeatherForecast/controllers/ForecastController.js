angular.module('Forecast').controller("ForecastController", 
            function($scope, WeatherFactory, GeolocationService, UnitToggleService,
                      IconMappingService, AvailabilityService, TimeoutService){
  var makeCurrentWeatherPromise = function(lat, lon){
    WeatherFactory.getWeather("currentWeather", lat, lon).then(function(data){  // uses then function allow the code to run after get weather completes
      // weather
      console.log(data);
      console.log("loading done, success");
      
      console.log("loading = " + AvailabilityService.loading);
      console.log("connected = " + AvailabilityService.connected);
      console.log("located = " + AvailabilityService.located);
      $scope.currently = data.data.currently;
      
      $scope.hourly = data.data.hourly;
      $scope.daily = data.data.daily;
      $scope.minutely = data.data.minutely;
      var tens = [];
      for(var k = 0; k < $scope.minutely.data.length; k++){
        if(k % 10 === 0){
          console.log('added');
          tens.push($scope.minutely.data[k]);
        }
      }
      console.log(tens);
      $scope.minutely.data = tens;  
      var skycons = new Skycons({color : 'white'});
      setTimeout(function(){//loading is done
        console.log('loading is done');
        skycons.add(document.getElementById("mainIcon"),$scope.currently.icon);
        skycons.add(document.getElementById("minutelySkycon"), $scope.minutely.icon);
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
      }, 10);
      AvailabilityService.loading = false;
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