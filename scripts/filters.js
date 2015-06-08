angular.module('WeatherApp').filter("weatherFilter", function(){
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
angular.module('WeatherApp').filter("dateFilter" , function(){
  return function(input){
    var a = new Date(input*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var period = "a.m.";
    if(hour > 12){
      hour -= 12;
      period = "p.m.";
    }
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var time =  month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + " " + period;
    return time;
  };
});