'use strict';

describe('sofa.goBackControl', function () {

    var element, $compile, $rootScope, navigationService, $window;

    beforeEach(module('sofa.goBackControl'));

    beforeEach(inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        navigationService = $injector.get('navigationService');
        $window = $injector.get('$window');
    }));

    it('should render the button', function () {
        element = $compile('<sofa-go-back-control button-text="Test"></sofa-go-back-control>')($rootScope);
        $rootScope.$digest();
        expect(element.text().trim()).toEqual('Test');
    });

    it('should render the parents title', function() {
        $rootScope.category = {
            label: 'Test',
            id: 'test',
            parent: {
                label: 'Parent',
                id: 'parent'
            }
        };
        element = $compile('<sofa-go-back-control category="category"></sofa-go-back-control>')($rootScope);
        $rootScope.$digest();
        expect(element.text().trim()).toEqual('Parent');
    });

    it('should trigger the navgation method on click', function() {
        spyOn(navigationService, 'goUp');
        $rootScope.category = {
            label: 'Test',
            id: 'test',
            parent: {
                label: 'Parent',
                id: 'parent'
            }
        };
        element = $compile('<sofa-go-back-control category="category"></sofa-go-back-control>')($rootScope);
        $rootScope.$digest();
        element.triggerHandler('click');
        expect(navigationService.goUp).toHaveBeenCalled();
    });
    
    it('should call the $window.histroy.back method when no category is given', function() {
        spyOn($window.history, 'back');
        element = $compile('<sofa-go-back-control></sofa-go-back-control>')($rootScope);
        $rootScope.$digest();
        element.triggerHandler('click');
        expect($window.history.back).toHaveBeenCalled();
    });
});
