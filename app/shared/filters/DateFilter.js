
angular.module('SharedElements').filter("DateFilter" , function(){
  return function(input, type){
    var a = new Date(input);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var weekday = [];
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thurs";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() === 0 ? "12" : a.getHours();
    var period = "am";
    if(hour > 12){
      hour -= 12;
      period = "pm";
    }
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var time;
    switch(type){
      case "month":
        time = month;
        break;
      case "day":
        time = date;
        break;
      case "day name":
        time = weekday[a.getUTCDay()];
        break;
      case "hour-only":
        time = hour+ " " + period;
        break;
      case "hour-minute":
        time = hour + ':' + min + " " + period;
        break;
      default:
        time =  month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + " " + period;
        break;
    }
    return time;
  };
});