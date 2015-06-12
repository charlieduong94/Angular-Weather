angular.module("SharedElements").service("TimeoutService", function(){
  var service = this;
  service.timerStarted = false;
  service.timedOut = false;
  service.observers = [];
  service.registerCallback = function(callback){
    service.observers.push(callback);
  };
  var notifyObservers = function(){
    // for each observer, do the callback
    angular.forEach(service.observers, function(callback){
      callback();
    });
  };
  service.startTimer = function(){
    timerStarted = true;
    setTimeout(function(){
      //after 7s set timer started to true
      service.timedOut = true;
      notifyObservers();
    }, 7000);
  };
  service.resetTImer = function(){
    service.timerStarted = false;
    service.timedOut = false;
  };
});