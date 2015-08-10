angular.module('Forecast').controller("ForecastController", 
            function($scope, WeatherFactory, GeolocationService, UnitToggleService, AvailabilityService, TimeoutService){
  var dataRetrievedFromStorage = false;
  var processResult = function(data){
    $scope.currently = data.data.currently;
    $scope.hourly = data.data.hourly;
    $scope.daily = data.data.daily;
    $scope.minutely = data.data.minutely;
    var tens = [];
    if(!dataRetrievedFromStorage){
      for(var k = 0; k < $scope.minutely.data.length; k++){
        if(k % 10 === 0){
          tens.push($scope.minutely.data[k]);
        }
      }
      $scope.minutely.data = tens;
    }
    var skycons = new Skycons({color : 'white'});
    setTimeout(function(){
      skycons.add(document.getElementById("mainIcon"),$scope.currently.icon);
      skycons.add(document.getElementById("minutelySkycon"), $scope.minutely.icon);
      for(var i = 0; i < $scope.hourly.data.length; i++){
        skycons.add(document.getElementById("hourlySkycon" + i), $scope.hourly.data[i].icon);
      }
      for(var j = 0; j < $scope.daily.data.length; j++){
        skycons.add(document.getElementById("dailySkycon" + j), $scope.daily.data[j].icon);
      }
      skycons.play();
      
    }, 100);
    AvailabilityService.loading = false;
    // store data
    // data stored
    if(!dataRetrievedFromStorage){
      chrome.storage.local.set( {
        savedData : {
          weatherData : {
            data : {
              currently : $scope.currently,
              minutely : $scope.minutely,
              hourly : $scope.hourly,
              daily : $scope.daily
            }
          }, 
          time : Date.now()
        }
      });
    }
  };
  var makeCurrentWeatherPromise = function(lat, lon){
    WeatherFactory.getWeather("currentWeather", lat, lon).then(processResult);
    
  };
  $scope.unitToggle = UnitToggleService;
  $scope.toggleButtonText = "Switch to Celsius";
  chrome.storage.local.get("savedData",function(data){ // this is async
    var time = Date.now() - 10*60000; // current date - 10 mins
    // if stored time is less than that of the current time - 10mins, time to allow an update
    if(data.savedData !== undefined && time < data.savedData.time){
      var newSavedTime = new Date(data.savedData.time);
      dataRetrievedFromStorage = true;
      AvailabilityService.located = true;
      processResult(data.savedData.weatherData);
    }
    else{
      GeolocationService.getLocation().then(function(data){
        if(data.serviceEnabled ){
          AvailabilityService.located = true;
          makeCurrentWeatherPromise(data.lat, data.lon);
        }
        else{
          AvailabilityService.located = false;
          AvailabilityService.loading = false;
        }
      });
    }
  });
  // after getting location, start timer
  TimeoutService.startTimer();
  // look into using chrome storage to store data
});