module.exports = dobWidget;

'use strict';
dobWidget.$inject = ['moment'];

function dobWidget(moment) {
  var fieldName;

  return {
    restrict: 'E',
    require: ['ngModel','^form'],
    scope:{
      ngModel: '='
    },
    templateUrl: 'scripts/common/dob-widget/dob-widget.template.html',
    compile: dobWidgetCompile,
    controller: dobWidgetCtrl,
    controllerAs: 'dobWidgetCtrl',
    bindToController: true
  };

  function dobWidgetCompile(element, attrs) {
    // required can have no value (required == "")
    if (attrs.required !== undefined) {
      element.find('.sc-dob-widget').attr("required", "true");
    }

    if (attrs.name) {
      fieldName = attrs.name;
      element.find('.sc-dob-widget').attr("name", attrs.name);
      element.removeAttr("name");
    }

    if (attrs.label) {
      element.find('.sc-dob-widget').attr("label", attrs.label);
      element.removeAttr("label");
    }

    return dobWidgetLink;
  }

  function dobWidgetLink(scope,element,attrs,ctrls) {
    var ngModelCtrl = ctrls[0];
    var formCtrl = ctrls[1];

    // we grab the formCtrl by name so that ngMessages will work
    scope[formCtrl.$name] = formCtrl;

    scope.$watchGroup([
      function() {return formCtrl.year.$touched},
      function() { return formCtrl.date.$touched}
    ], function(newVal, oldVal) {
      var yearTouched = newVal[0] || formCtrl.year.$modelValue;
      var dateTouched = newVal[1] || formCtrl.date.$modelValue;
      var monthTouched = scope.dobWidgetCtrl.selectedMonth !== "";
      if (yearTouched && dateTouched) {
        formCtrl[fieldName].$setTouched();
      }
    });

    scope.$watch('dobWidgetCtrl.selectedMonth', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (formCtrl.year.$modelValue && formCtrl.date.$modelValue) {
          formCtrl[fieldName].$setTouched();
        }
      }
    });

    scope.$watchGroup(['dobWidgetCtrl.selectedMonth', 'dobWidgetCtrl.selectedDate', 'dobWidgetCtrl.selectedYear'], function(newVals, oldVals) {
      if (newVals && newVals[0] && (newVals[0] !== '') && newVals[1] && newVals[2]) {
        var d = moment(newVals[0] + '/' + newVals[1] + '/' + newVals[2], 'MM/DD/YYYY');
        var isValid = true;
        ngModelCtrl.$setViewValue(d.format('MM/DD/YYYY'));

        formCtrl.setError(fieldName, 'pastToday', false);
        formCtrl.setError(fieldName, 'badDate', false);

        if (d.isValid()) {
          if (!d.isBefore(moment())) {
            formCtrl.setError(fieldName, 'pastToday', true);
          }
        }
        else {
          formCtrl.setError(fieldName, 'badDate', true);
        }
      }
      else{
        ngModelCtrl.$setViewValue(null);
      }
    });

    ngModelCtrl.$formatters.push(function(val) {
      if (val) {
        var d = moment(val,'MM/DD/YYYY');
        scope.dobWidgetCtrl.selectedMonth = d.month() + 1;
        scope.dobWidgetCtrl.selectedDate = d.date();
        scope.dobWidgetCtrl.selectedYear = d.year();
      }
      else {
        scope.dobWidgetCtrl.selectedMonth = '';
      }
    });
  }

  function dobWidgetCtrl() {

    var vm = this;
    vm.selectedDate = null;
    vm.selectedYear = null;
    vm.months = [
      {
        'key': '',
        'value': 'Month'
      },
      {
        'key': 1,
        'value': 'January'
      },
      {
        'key': 2,
        'value': 'February'
      },
      {
        'key': 3,
        'value': 'March'
      },
      {
        'key': 4,
        'value': 'April'
      },
      {
        'key': 5,
        'value': 'May'
      },
      {
        'key': 6,
        'value': 'June'
      },
      {
        'key': 7,
        'value': 'July'
      },
      {
        'key': 8,
        'value': 'August'
      },
      {
        'key': 9,
        'value': 'September'
      },
      {
        'key': 10,
        'value': 'October'
      },
      {
        'key': 11,
        'value': 'November'
      },
      {
        'key': 12,
        'value': 'December'
      }
    ];
  }
}


