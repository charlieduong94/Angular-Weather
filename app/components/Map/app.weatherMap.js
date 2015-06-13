angular.module("WeatherMap", [ "uiGmapgoogle-maps"]).config(function(uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBV_A1v261yV6UJhb0wfaCVbrtBTuW6a9g',
    v: '3.17',
    libraries : 'weather, geometry, visualization'
  });
});