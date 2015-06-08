angular.module('SharedElements').filter("WeatherFilter", function(){
  return function(input, unit){
        var temp;
        if(input === undefined){
          return "";
        }
        switch(unit){
          case "fahrenheit":
            temp = ((9/5)*(input -273.15) + 32).toFixed(1) + "\u00B0F";
            break;
          case "celsius":
            temp = (input - 273.15).toFixed(1) + "\u00B0C";
            break;
          default:
            temp = "";
            break;
        }
        return temp;
      };
  
});