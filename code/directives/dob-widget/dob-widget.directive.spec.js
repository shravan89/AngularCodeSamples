describe("Dob Directive:", function() {
  var scope, el, $compile, $rootScope, ctrl, moment;

  beforeEach(function () {
    angular.mock.module('sc.common');
    angular.mock.module('scui.templates');

    inject(function (_$rootScope_, _$compile_, _moment_) {
      moment = _moment_;
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
    el = angular.element('<form name="form"><dob-widget name="birthdate" ng-model="dob"></dob-widget></form>');
    scope = $rootScope.$new();
    scope.dob = null;
    $compile(el)(scope);
    scope.$digest();
    ctrl = el.find('dob-widget').controller("dobWidget");

  });

  it('make sure dob widget is getting updated for selectedMonth', function () {
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('2').change();
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated for selectedYear', function () {
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2010').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated for selectedDate', function () {
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('25').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated for selectedDate and selectedMonth',function(){
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('3').change();
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('23').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated for selectedDate and selectedYear',function(){
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2010');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('23').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated for selectedMonth and selectedYear',function(){
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('4').change();
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2012').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated if users unselects month', function () {
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2010').trigger('input');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('20').trigger('input');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('2').change();
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('').change();
    scope.$digest();
   expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated if users resets the selected year', function () {
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2010').trigger('input');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('20').trigger('input');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('2').change();
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('make sure dob widget is getting updated if users resets the selected date', function () {
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2010').trigger('input');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('20').trigger('input');
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedMonth"]')).val('2').change();
    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('').trigger('input');
    scope.$digest();
    expect(scope.dob).toBe(null);
  });

  it('test required on parent element', function() {
    el = angular.element('<form name="form"><dob-widget ng-model="dob" name="dob"></dob-widget></form>');
    scope = $rootScope.$new();
    scope.dob = null;
    $compile(el)(scope);
    scope.$digest();

    expect(el.find('.sc-dob-widget').attr("required")).toEqual(undefined);

    el = angular.element('<form name="form"><dob-widget ng-model="dob" name="dob" required></dob-widget></form>');
    scope = $rootScope.$new();
    scope.dob = null;
    $compile(el)(scope);
    scope.$digest();

    expect(el.find('.sc-dob-widget').attr("required") !== undefined).toBeTruthy();
  })

  it('test required validation date and year', function() {
    el = angular.element('<form name="form"><dob-widget ng-model="dob" name="dob" label="Birthdate" required></dob-widget></form>');
    scope = $rootScope.$new();
    $compile(el)(scope);
    scope.$digest();

    expect(el.html().indexOf('Birthdate is required') > -1).toBeTruthy();

    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedYear"]')).val('2010').trigger('input');
    el.controller("form").year.$touched = true;
    expect(el.controller("form").dob.$touched).toBeFalsy();
    expect(el.controller("form").dob.$untouched).toBeTruthy();


    angular.element(el.find('[ng-model="dobWidgetCtrl.selectedDate"]')).val('2').trigger('input');
    el.controller("form").date.$touched = true;
    expect(el.controller("form").dob.$touched).toBeTruthy();
    expect(el.controller("form").dob.$untouched).toBeFalsy();
  })

  it('test past today validation', function() {
    el = angular.element('<form name="form"><dob-widget ng-model="dob" name="dob" label="Birthdate"></dob-widget></form>');
    scope = $rootScope.$new();
    var later = moment().add(1, 'y');

    $compile(el)(scope);
    scope.$digest();

    var ctrl = el.find('dob-widget').controller('dobWidget');
    ctrl.selectedDate = 1;
    ctrl.selectedYear = later.year();
    ctrl.selectedMonth = 3;
    scope.$digest();

    expect(el.html().indexOf('Birthdate is past today') > -1).toBeTruthy();
  })

});
