describe("Validation Directive:", function() {
  var scope;
  var el;
  var $stateParams;
  var $compile;
  var $q;


  beforeEach(function () {
    angular.mock.module('sc.common');

    inject(function ($rootScope, _$compile_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

  it('should render a custom message', function(){

    el = angular.element('<form name="form1"><input name="requiredField" validation-messages="{{otherMessages}}"/></form>');
    var newScope = scope.$new();
    newScope.otherMessages = {'custom': 'custom message'};

    $compile(el)(newScope);
    newScope.$digest();
    expect(el.html().indexOf("ngMessage: custom") > -1).toBeTruthy();
  });

  it('should trigger a custom message', function(){

    el = angular.element('<form name="form1"><input name="requiredField" ng-model="x" validation-messages="{{otherMessages}}"/></form>');
    var newScope = scope.$new();
    newScope.otherMessages = {'custom': 'custom message'};
    $compile(el)(newScope);
    newScope.$digest();

    var formCtrl = el.controller("form");
    formCtrl.setError('requiredField', 'custom', true);

    newScope.$digest();
    expect(el.html().indexOf("undefined custom message") > -1).toBeTruthy();
  });


  it('should render a required message', function(){

    el = angular.element('<form name="form1"><input name="requiredField" validation-messages required type="text"/></form>');
    var newScope = scope.$new();

    $compile(el)(newScope);
    newScope.$digest();
    expect(el.find("[ng-messages='form1.requiredField.$error']").length).toBe(1);
    expect(el.find("[ng-messages='form1.requiredField.$error']").html().indexOf("<!-- ngMessage: required -->") > -1).toBe(true);
    expect(el.find("[ng-messages='form1.requiredField.$error']").html().indexOf("<!-- ngMessage: server -->") > -1).toBe(true);
  });

  it('should render a email message', function(){

    el = angular.element('<form name="form1"><input name="requiredField" validation-messages type="email"/></form>');
    var newScope = scope.$new();

    $compile(el)(newScope);
    newScope.$digest();
    expect(el.find("[ng-messages='form1.requiredField.$error']").length).toBe(1);
    expect(el.find("[ng-messages='form1.requiredField.$error']").html().indexOf("<!-- ngMessage: email -->") > -1).toBe(true);
    expect(el.find("[ng-messages='form1.requiredField.$error']").html().indexOf("<!-- ngMessage: server -->") > -1).toBe(true);
  });

  it('should render a pattern message', function(){

    el = angular.element('<form name="form1"><input name="requiredField" validation-messages type="text" ng-pattern="/[0-9]/"/></form>');
    var newScope = scope.$new();

    $compile(el)(newScope);
    newScope.$digest();
    expect(el.find("[ng-messages='form1.requiredField.$error']").length).toBe(1);
    expect(el.find("[ng-messages='form1.requiredField.$error']").html().indexOf("<!-- ngMessage: pattern -->") > -1).toBe(true);
    expect(el.find("[ng-messages='form1.requiredField.$error']").html().indexOf("<!-- ngMessage: server -->") > -1).toBe(true);
  });

  it('should render a server message', function(){

    el = angular.element('<form name="form1"><input name="requiredField" validation-messages type="text" ng-pattern="/[0-9]/" ng-model="phoneNumber" /></form>');
    var newScope = scope.$new();

    $compile(el)(newScope);
    newScope.$digest();

    expect(newScope.form1.requiredField.$valid).toBe(true);
    expect(newScope.form1.requiredField.$invalid).toBe(false);
    expect(newScope.form1.$valid).toBe(true);
    expect(newScope.form1.$invalid).toBe(false);

    newScope.form1.serverError("requiredField", true, "error message");
    newScope.$digest();

    expect(newScope.form1.requiredField.$valid).toBe(false);
    expect(newScope.form1.requiredField.$invalid).toBe(true);
    expect(newScope.form1.$valid).toBe(false);
    expect(newScope.form1.$invalid).toBe(true);
    expect(el.find("div[ng-message='server']").html().indexOf("error message") > -1).toBeTruthy();

    newScope.form1.serverError("requiredField", false);
    newScope.$digest();

    expect(newScope.form1.requiredField.$valid).toBe(true);
    expect(newScope.form1.requiredField.$invalid).toBe(false);
    expect(newScope.form1.$valid).toBe(true);
    expect(newScope.form1.$invalid).toBe(false);
    expect(el.find("div[ng-message='server']").length).toBe(0);

  });

  it('should clear all errors', function(){

    el = angular.element('<form name="form1"><input name="requiredField" validation-messages type="text" ng-pattern="/[0-9]/" ng-model="phoneNumber" /></form>');
    var newScope = scope.$new();

    $compile(el)(newScope);
    newScope.$digest();

    expect(newScope.form1.requiredField.$valid).toBe(true);
    expect(newScope.form1.requiredField.$invalid).toBe(false);
    expect(newScope.form1.$valid).toBe(true);
    expect(newScope.form1.$invalid).toBe(false);

    newScope.form1.serverError("requiredField", true);
    newScope.$digest();

    expect(newScope.form1.requiredField.$valid).toBe(false);
    expect(newScope.form1.requiredField.$invalid).toBe(true);
    expect(newScope.form1.$valid).toBe(false);
    expect(newScope.form1.$invalid).toBe(true);

    newScope.form1.clearErrors("requiredField");
    newScope.$digest();

    expect(newScope.form1.requiredField.$valid).toBe(true);
    expect(newScope.form1.requiredField.$invalid).toBe(false);
    expect(newScope.form1.$valid).toBe(true);
    expect(newScope.form1.$invalid).toBe(false);
  });

  it('should throw an error for nameless form', function(){
    function errorFunctionWrapper()
    {
      el = angular.element('<form><input name="requiredField" validation-messages type="text" ng-pattern="/[0-9]/"/></form>');
      var newScope = scope.$new();

      $compile(el)(newScope);
      newScope.$digest();
    }
    expect(errorFunctionWrapper).toThrow();
  });

  it('should throw an error for nameless element', function(){
    function errorFunctionWrapper()
    {
      el = angular.element('<form name="form1"><input validation-messages type="text" ng-pattern="/[0-9]/"/></form>');
      var newScope = scope.$new();

      $compile(el)(newScope);
      newScope.$digest();
    }
    expect(errorFunctionWrapper).toThrow();
  });


});
