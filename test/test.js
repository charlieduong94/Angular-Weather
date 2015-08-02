describe("Array", function(){
	describe("#indexOf", function(){
		it("Should return -1 when the value is not present", function(){
			assert.notInclude([1,2,3], 4, "value is not in array");
		});
	});
});