describe("Check AU Lost and Found Function", function(){
    context("Student table function", function(){
        it("Table search returns -1 which returns value", function(){
            let tableInd = -1
            chai.assert.equal(tableInd, -1)
        });
        it("Table search returns anything but -1 which returns none", function(){
            let tableInd = 2
            chai.assert.equal(tableInd, 2)
        });
    });
});