
angular.module('SharedElements').filter("DateFilter" , function(){
  return function(input, type){
    var a = new Date(input);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var weekday = [];
    weekday[0] = "Sat";
    weekday[1] = "Sun";
    weekday[2] = "Mon";
    weekday[3] = "Tues";
    weekday[4] = "Wed";
    weekday[5] = "Thurs";
    weekday[6] = "Fri";
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