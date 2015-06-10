angular.module("SharedElements").controller("UnitToggleController", function($scope, UnitToggleService){
  $scope.toggleButtonText = "Switch to Celsius";
  $scope.toggleUnit = function(){
    console.log(UnitToggleService.unit);
    if(UnitToggleService.unit === "fahrenheit"){
      $scope.toggleButtonText = "Switch to Fahrenheit";
      UnitToggleService.unit = "celsius";
    }
    else{
      $scope.toggleButtonText = "Switch to Celsius";
      UnitToggleService.unit = "fahrenheit";
    }
  };
});