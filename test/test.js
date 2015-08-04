// shared filters
describe("SharedElements", function(){
	beforeEach(function(){
		module("SharedElements"); // get module "SharedElements"
		
	});
	it("should contain have a PercentageFilter", inject(function($filter){ // inject filter
		var result = $filter("PercentageFilter"); // create filter
		expect(result).to.not.be.null;			  // assert
	}));
	it("should contain have a WeatherFilter", inject(function($filter){ // inject filter
		var result = $filter("WeatherFilter"); // create filter
		expect(result).to.not.be.null;			  // assert
	}));
	it("should contain have a WindDirectionFilter", inject(function($filter){ // inject filter
		var result = $filter("WindDirectionFilter"); // create filter
		expect(result).to.not.be.null;			  // assert
	}));
	it("should contain have a DateFilter", inject(function($filter){ // inject filter
		var result = $filter("DateFilter"); // create filter
		expect(result).to.not.be.null;			  // assert
	}));
});
describe("PercentageFilter", function(){
	beforeEach(function(){
		module("SharedElements"); // get module "SharedElements"
		
	});
	it("should convert decimal to a percentage", inject(function($filter){ // inject filter
		var decimal = 0.91;
		var result = $filter("PercentageFilter")(decimal); // init filter
		expect(result).to.equal("91%");					   // assert
	}));


});
/*
describe("WindDirectionFilter", function(){
	var filter;
	beforeEach(function(){
		module("SharedElements"); // get module "SharedElements"
		inject(function($filter){
			filter = $filter("WindDirectionFilter"); // set filter as weather filter
		});
	});
	it("should convert degrees into the proper Cardinal Direction", function(){ 
		var result = filter(0); // init filter
		expect(result).to.equal("N");					   // assert
		result = filter(22); 
		expect(result).to.equal("NNE");
		result = filter(52); // init filter
		expect(result).to.equal("ENE");
		result = filter(89); // init filter
		expect(result).to.equal("E");
		result = filter(105); // init filter
		expect(result).to.equal("ESE");
		result = filter(134.33); // init filter
		expect(result).to.equal("SE");
		result = filter(150); // init filter
		expect(result).to.equal("SSE");
		result = filter(177.77); // init filter
		expect(result).to.equal("S");
		result = filter(200.41); // init filter
		expect(result).to.equal("SSW");
		result = filter(213.99); // init filter
		expect(result).to.equal("SW");
		result = filter(249.33); // init filter
		expect(result).to.equal("WSW");
		result = filter(260); // init filter
		expect(result).to.equal("W");
		result = filter(300.11); // init filter
		expect(result).to.equal("WNW");
		result = filter(310.23); // init filter
		expect(result).to.equal("NW");
		result = filter(333.333); // init filter
		expect(result).to.equal("NNW");
		result = filter(0); // init filter
		expect(result).to.not.equal("S");
		result = filter(22); // init filter
		expect(result).to.not.equal("ENE");
	});
});
*/

describe("WeatherFilter", function(){
	var filter;
	beforeEach(function(){
		module("SharedElements"); // get module "SharedElements"
		inject(function($filter){
			filter = $filter("WeatherFilter"); // set filter as weather filter
		});
	});
	
	it("should fix to one decimal point", function(){ // inject filter
		var result = filter(91.111123232, "fahrenheit"); // init filter
		expect(result).to.equal("91.1" + "\u00B0F");					   // assert
	});
	
	it("should do no conversion if 'unit' is set to 'fahrenheit'", function(){
		var result = filter(62.1, "fahrenheit");
	    expect(result).to.equal("62.1" + "\u00B0F");					   // assert
	});

	it("should convert from celsius to fahrenheit if 'unit' is set to 'celsius'", function(){
		var result = filter(62.1, "celsius");
	    expect(result).to.equal("16.7" + "\u00B0C");					   // assert
	});

});

describe("DateFilter", function(){
	var filter;
	var testEpoch = 1438556132086; // "Sun Aug 02 2015 18:56:18 GMT-0400 (EDT)"

	beforeEach(function(){
		module("SharedElements"); // get module "SharedElements"
		inject(function($filter){
			filter = $filter("DateFilter"); // set filter as weather filter
		}); 
	});
	it("should be able to retrieve the month successfully from unix timestamp", function(){ // inject filter
		var result = filter(testEpoch, "month");
		expect(result).to.equal("Aug");					   // assert
		expect(result).to.not.equal("Jan");
	});
	it("should be able to retrieve the day successfully from unix timestamp", function(){ // inject filter
		var result = filter(testEpoch, "day"); 
		expect(result).to.equal(2);					   // assert
		expect(result).to.not.equal(3);
	});
	it("should be able to retrieve the day of the week successfully from unix timestamp", function(){ // inject filter
		var result = filter(testEpoch, "day name"); 
		expect(result).to.equal("Sun");					   // assert
		expect(result).to.not.equal("Sat");
	});
	it("should be able to retrieve current hour (not military) successfully from unix timestamp", function(){ // inject filter
		var result = filter(testEpoch, "hour-only"); 
		expect(result).to.equal("10 pm");					   // assert
		expect(result).to.not.equal("22 pm");
	});
	it("should be able to retrieve current hour and minute (not military) successfully from unix timestamp", function(){ // inject filter
		var result = filter(testEpoch, "hour-minute"); 
		expect(result).to.equal("10:55 pm");					   // assert
		expect(result).to.not.equal("22:55 pm");
	});
	it("should be able to return the time in a standard date format or <month> <day>, <year> <hour>:<min> <period>", function(){
		var result = filter(testEpoch, "");
		expect(result).to.equal("Aug 2, 2015 10:55 pm");
	});
});
