describe("StateDropdown Directive:", function() {
  var scope,el,$compile,$rootscope,ctrl;
  beforeEach(function () {
    angular.mock.module('sc.common');
    angular.mock.module('scui.templates');

    inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

    });

    el = angular.element('<state-dropdown ng-model="states"><state-dropdown />');
    scope = $rootScope.$new();
    $compile(el)(scope);
    scope.$digest();
    ctrl = el.controller("stateDropdown");
  });

  it('make sure all states are rendered', function() {

    expect(el.find('option').length).toBe(ctrl.states.length + 1);
    for(var i = 0; i < ctrl.states.length; i++) {
      expect(el.html().indexOf(ctrl.states[i].name) > -1).toBeTruthy();
    }
  });

  it('updating the view when the model is changed',function(){
    ctrl.ngModel = 'AL';
    scope.$digest();
    expect(el.find('option[label="Alabama"]').attr('selected')).toBeTruthy();
  });

  xit('updating the model when a state is selected',function(){
    angular.element(el.find("select")[0]).val('0');
    angular.element(el.find("select")[0]).change();
    expect(ctrl.ngModel).toBe("AL");
  });

  it('abbreviation should match with the label',function() {
    var alIndex = -1;
    var deIndex = -1;
    for (var i = 0; i < ctrl.states.length; i++) {
      if (ctrl.states[i].abbreviation === 'AL') {
        alIndex = i;
      }

      if (ctrl.states[i].abbreviation === 'DE') {
        deIndex = i;
      }

      if (alIndex > -1 && deIndex > -1) {
        break;
      }
    }
    expect((el.find('option')[alIndex + 1].label === "Alabama") && (ctrl.states[alIndex].abbreviation === "AL")).toBeTruthy();
    expect((el.find('option')[deIndex + 1].label === "Delaware") && (ctrl.states[deIndex].abbreviation === "DE")).toBeTruthy();
  });
});