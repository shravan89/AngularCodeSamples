describe('Save Button Directive:', function() {

  var scope, el, $compile, $rootScope, ctrl;

  beforeEach(function () {
    angular.mock.module('sc.common');
    angular.mock.module('scui.templates');

    inject(function (_$rootScope_, _$compile_, _$q_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $q = _$q_;
    });

 });

  describe('should set the button text and width from config', function () {
    beforeEach(function () {
      el = angular.element('<div sc-save-button config="config" on-click="save()"></div>');
      scope = $rootScope.$new();
      scope.save = function () {
        var defer = $q.defer();
        return defer.promise;
      };
      scope.config = {
        startText: ['SAVE', 110],
        savingText: ['SAVING', 200]
      };
      $compile(el)(scope);
      scope.$digest();
      ctrl = el.controller('scSaveButton');
    });

    it('should set button text from config', function () {
      expect(el.find('.save-button__start').text()).toEqual('SAVE');
      expect(el.find('.save-button__process span').text()).toEqual('SAVING');
    });

    it('should set button width from config', function () {
      expect(ctrl.config.startTextWidth).toEqual(110);
      expect(ctrl.config.savingTextWidth).toEqual(200);
    });

    it('should trigger save button', function () {
      spyOn(ctrl,'clickFn').and.callThrough();
      el.find('.save-button__start').trigger('click');
      expect(ctrl.clickFn).toHaveBeenCalled();
      expect(el.find('.save-button__confirm').hasClass('save-button__confirm-processing')).toBeTruthy();
    });

    it('should pass if on-click attribute is provided',function(){
      expect(function() { $compile(el)(scope); }).not.toThrow();
    });

    it('should reset when promise has been resolved', function(){
      scope.save = function() {
        var d = $q.defer();
        d.resolve('test');
        return d.promise;
      };
      scope.$digest();
      el.find('.save-button__start').trigger('click');
      expect(el.find('.save-button__confirm').hasClass('save-button__confirm-processing')).toBeFalsy();
    });

  });

});