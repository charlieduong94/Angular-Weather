
angular.module('SharedElements').service("IconMappingService", function(){
  var openWeatherNames = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d',                          
                          '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
  var weatherIconClasses = ['wi-day-sunny', 'wi-night-clear', 'wi-day-cloudy', 'wi-night-cloudy',
                            'wi-cloudy', 'wi-cloudy', 'wi-cloudy', 'wi-cloudy', 'wi-rain', 'wi-rain',
                            'wi-day-rain', 'wi-night-rain', 'wi-thunderstorm', 'wi-thunderstorm', 
                            'wi-snow', 'wi-snow', 'wi-fog', 'wi-fog'];
  return function(iconName){
    return weatherIconClasses[openWeatherNames.indexOf(iconName)];
  };
                        
});
