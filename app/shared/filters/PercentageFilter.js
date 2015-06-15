angular.module("SharedElements").filter("PercentageFilter", function(){
  return function(input){
    return (input * 100).toFixed(0) + "%";
  };
});