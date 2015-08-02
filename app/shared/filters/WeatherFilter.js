angular.module('SharedElements').filter("WeatherFilter", function(){
  return function(input, unit){ // input comes in as F
        var temp;
        if(input === undefined){
          return "";
        }
        switch(unit){
          case "celsius":
            temp = parseFloat((input - 32) * 5 / 9).toFixed(1) + "\u00B0C";
            break;
          case "fahrenheit":
          default:
            temp = parseFloat(input).toFixed(1) + "\u00B0C";
            break;
        }
        return temp;
      };
  
});