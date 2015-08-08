angular.module('SharedElements').filter("WindDirectionFilter" , function(){
    return function(input){
  		var degArray = [11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75, 360];
  		var dirNames = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
  		for (var i = 0; i < degArray.length; i++){
  			if (input < degArray[i]) {
  				windDir = dirNames[i];
  				break;
  			}
  		}
  		return windDir;
  	};
});