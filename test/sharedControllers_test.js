describe("TabController", function(){
	var $controller;
	beforeEach(function(){
		module("SharedElements");
		inject(function(_$controller_){
			$controller = _$controller_;
		});
	});
	describe("$scope.currentTab", function(){
		it("should be initialized to 1", function(){
			var $scope = {};
			var controller = $controller("TabController", { $scope : $scope });
			expect($scope.currentTab).to.equal(1);

		});
		it("should be set when setTab is called", function(){
			var $scope = {};
			var controller = $controller("TabController", { $scope : $scope });

			$scope.setTab(3);
			expect($scope.currentTab).to.equal(3);
			expect($scope.currentTab).to.not.equal(2);
		});
	});
});

describe("UnitToggleController", function(){
	var $controller;
	beforeEach(function(){
		module("SharedElements");
		inject(function(_$controller_){
			$controller = _$controller_;
		});
	});

	// define mock unit service, although this is pretty 
	function mockService(){
		this.unit = "fahrenheit";
	}
	describe("$scope.toggleButtonText", function(){
		describe("should equal 'Switch to Celsius' when initialized", function(){
			it("", function(){	
				var $scope = {};
				var controller = $controller("UnitToggleController", { 
					$scope : $scope , UnitToggleService : new mockService()
				});
				expect($scope.toggleButtonText).to.equal("Switch to Celsius");

			});
			it("should change to 'Switch to Celsius' upon $scope.toggleUnit when unit = 'celsius", function(){
				var $scope = {};
				var service = new mockService();
				service.unit = "celsius";
				var controller = $controller("UnitToggleController", { $scope : $scope, UnitToggleService : service});
				$scope.toggleUnit();
				expect($scope.toggleButtonText).to.equal("Switch to Celsius");
			});	
			it("should change to 'Switch to Fahrenheit' upon $scope.toggleUnit when unit = 'fahrenheit'", function(){
				var $scope = {};
				var service = new mockService();
				var controller = $controller("UnitToggleController", { $scope : $scope, UnitToggleService : service});
				$scope.toggleUnit();
				expect($scope.toggleButtonText).to.equal("Switch to Fahrenheit");
			});	
		});
	});
});
// this even needed?
describe("AvailabilityController", function(){
	var $controller;
	beforeEach(function(){
		module("SharedElements");
		inject(function(_$controller_){
			$controller = _$controller_;
		});
	});
	var mockService = function(located, connected, loading){
		this.observers = [];
		this.located = located;    // checks if located or not
		this.connected = connected;
		this.loading = loading;
	};
	describe("$scope.isLocated()", function(){
		it("should equal located if located = true", function(){
			var $scope = {};
			var service = new mockService(true, true, true);
			var controller = $controller("AvailabilityController", { $scope : $scope, AvailabilityService : service});
			expect($scope.isLocated()).to.equal(true);
		});
	});
	describe("$scope.isConnected()", function(){
		it("should equal located if connected = true", function(){
			var $scope = {};
			var service = new mockService(true, true, true);
			var controller = $controller("AvailabilityController", { $scope : $scope, AvailabilityService : service});
			expect($scope.isConnected()).to.equal(true);
		});
	});
	describe("$scope.isLoading()", function(){
		it("should equal located if loading = true", function(){
			var $scope = {};
			var service = new mockService(true, true, true);
			var controller = $controller("AvailabilityController", { $scope : $scope, AvailabilityService : service});
			expect($scope.isLoading()).to.equal(true);
		});
	});
});