angular.module('SharedElements').controller("TabController", function($scope){
  $scope.currentTab = 1; // init current tab 
  $scope.var = true;
  $scope.setTab = function(tab){
    $scope.currentTab = tab;
  };
  $scope.isActive = function(tab){
    return $scope.currentTab == tab;
  };
});