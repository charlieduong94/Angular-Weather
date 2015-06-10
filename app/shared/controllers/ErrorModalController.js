angular.module('SharedElements').controller('ErrorModalController', function($scope, $modalInstance){
  $scope.exit = function(){
    window.close();
  };
});