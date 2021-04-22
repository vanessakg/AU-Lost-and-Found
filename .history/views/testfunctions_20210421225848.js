describe("Check the checkValid Function", function(){
    context("Check Initial class", function(){
        it("Can create an object", function(){
            let vac = new vacationDays(45, 10);
            chai.assert.isTrue(vac.checkValid(16,130, vac.age));
        });
    });
    let vac = new vacationDays(130, 10);
            chai.assert.isTrue(vac.checkValid(16,130, vac.age));
        });
        it("checkValid is false with an age lower than 16 ", function(){
            let vac = new vacationDays(10, 10);
            chai.assert.isFalse(vac.checkValid(16,130, vac.age));
        });
        it("checkValid is false with an age larger than 130 ", function(){
            let vac = new vacationDays(150, 10);
            chai.assert.isFalse(vac.checkValid(16,130, vac.age));
        });
        it("checkValid is false if age is null ", function(){
            let vac = new vacationDays("", 10);
            chai.assert.isFalse(vac.checkValid(16,130, vac.age));
        });
    });
    context("Check experience", function(){
        it("checkValid is true with years of experience between 0 and 80", function(){
            let vac = new vacationDays(45, 10);
            chai.assert.isTrue(vac.checkValid(0,80, vac.years));
        });
        it("checkValid is true with years of experience at 0", function(){
            let vac = new vacationDays(45, 0);
            chai.assert.isTrue(vac.checkValid(0,80, vac.years));
        });
        it("checkValid is true with years of experience at 80", function(){
            let vac = new vacationDays(45, 80);
            chai.assert.isTrue(vac.checkValid(0,80, vac.years));
        });
        it("checkValid is true with years of experience lower than 0", function(){
            let vac = new vacationDays(45, -1);
            chai.assert.isFalse(vac.checkValid(0,80, vac.years));
        });
        it("checkValid is true with years of experience higher than 80", function(){
            let vac = new vacationDays(45, 90);
            chai.assert.isFalse(vac.checkValid(0,80, vac.years));
        });
    });
    context("Check vacation days", function(){
        it("Catches error with age less than 16", function(){
            let vac = new vacationDays(15, 10);
            let val = vac.getVacationDays();
            chai.assert.isTrue(val.errorFlag);
            val.should.throw(Error);
        });
        it("Goes into actually grabbing vacation days if age is good", function(){
            let vac = new vacationDays(20, 10);
            let val = vac.getVacationDays();
            chai.assert.isFalse(val.errorFlag);
        });
        it("Grabs proper number of vacations days for less than 5 years", function(){
            let vac = new vacationDays(20, 4);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 3);
        });
        it("Grabs proper number of vacations days for above 5 years but lower than 12", function(){
            let vac = new vacationDays(20, 8);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 8);
        });
        it("Grabs proper number of vacations days for above 12 years but lower than 16", function(){
            let vac = new vacationDays(20, 14);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 13);
        });
        it("Grabs proper number of vacations days for above 16 years but lower than 30", function(){
            let vac = new vacationDays(20, 20);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 15);
        });
        it("Grabs proper number of vacations days for above 30 years", function(){
            let vac = new vacationDays(20, 35);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 18);
        });
        it("Grabs proper number of vacations days for above 30 years and 60 age", function(){
            let vac = new vacationDays(60, 35);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 21);
        });
        it("Grabs proper number of vacations days for above 30 years and higher than 60 age", function(){
            let vac = new vacationDays(65, 35);
            let val = vac.getVacationDays();
            chai.assert.equal(val.val, 21);
        });
    });
});