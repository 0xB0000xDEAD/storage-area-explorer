describe("Testing appContext Service", function () {

    var injector;
    var evalService = {};
    var q;
    var chromeApi;
    beforeEach(function () {
        chromeApi = chrome.mocks.mockChromeApi();
        module("storageExplorer");
        evalService.evalFunction = jasmine.createSpy().andCallFake(function () {
            var defer = q.defer();
            defer.resolve({manifest: {name: "test"}, id: "id"});
            return defer.promise;
        });
        module(function ($provide) {

            $provide.value("evalService", evalService);
            $provide.value("devtools",chromeApi.devtools);

        });
        inject(function ($injector, $q) {
            injector = $injector;
            q = $q;
        });
    });



    it("On success should call evalService.evalFunction and resolve promise with results", function () {
        var callbackCalled = false;
        var appContext = injector.get('appContext');
        appContext().then(function (appInfo) {
            console.log(appInfo);
            expect(appInfo.tabId).toBe(11);
            expect(appInfo.id).toBe("id");
            callbackCalled = true;
        });
        var $rootScope = injector.get('$rootScope');
        $rootScope.$apply();
        expect(callbackCalled).toBeTruthy();
        expect(evalService.evalFunction).toHaveBeenCalled();
    });

    it("should call promise reject evalService.evalFunction fail should ", function () {
        evalService.evalFunction = jasmine.createSpy("evalFunction").andCallFake(function (fnc) {
            var defer = q.defer();
            fnc(chromeApi);
            defer.reject();
            return defer.promise;
        });
        var errorCallback = jasmine.createSpy("errorCallback");
        injector.get('appContext')().then(function () {
        }, errorCallback);
        injector.get('$rootScope').$apply();
        expect(errorCallback).toHaveBeenCalled();
    });

});