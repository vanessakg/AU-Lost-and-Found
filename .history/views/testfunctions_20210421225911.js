describe("Check the checkValid Function", function(){
    context("Check Initial class", function(){
        it("Can create an object", function(){
            let vac = new vacationDays(45, 10);
            chai.assert.isTrue(vac.checkValid(16,130, vac.age));
        });
    });
});