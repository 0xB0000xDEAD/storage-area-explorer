describe("Testing background devtools extension script", function () {


    var panels = {};

//    var inspectedWindow = {};

    beforeEach(function () {
        panels = {
            create: jasmine.createSpy('panels.create')
        };
//        inspectedWindow = {
//            eval: jasmine.createSpy('inspectedWindow.eval')
//        };
    });


    it("Should create panel", function () {
        initializeDevtoolsPage(panels);
    });

    xit("Should not create panels when storage is not available",function(){
        inspectedWindow.eval.andCallFake(function (expression,callback) {
            expect(expression).toBe("!!chrome.runtime && chrome.runtime.getManifest()");
            callback({permissions:[]});
        });
        initializeDevtoolsPage(panels,inspectedWindow);
        expect(inspectedWindow.eval).toHaveBeenCalled();
        expect(panels.create).not.toHaveBeenCalled();
    });

});