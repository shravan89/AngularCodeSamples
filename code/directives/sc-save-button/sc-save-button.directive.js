'use strict';

module.exports = saveButtonDirective;

saveButtonDirective.$inject = [];

function saveButtonDirective() {
  return {
    restrict: "EA",
    scope: {
      config: '=?',
      onClick: '&'
    },
    templateUrl: 'scripts/common/sc-save-button/sc-save-button.template.html',
    link: linkFn,
    controller: saveButtonController,
    controllerAs: 'saveButtonController',
    bindToController: true
  };

  function linkFn(scope, el, attr, ctrl){
    /// *** Instructions for this directive ** ////
      // on-click attribute should be defined and it should be a function,otherwise it throws an exception.
     // Also,the function should return promise Object as the directive is expecting a promise object.
    // eg: <div sc-save-button config = "config" on-click = "click()"> </div>

    if((attr.onClick === undefined)){
      throw new Error('on-click attribute is undefined');
    }
    // UI
    var btnContainer = el.find('.save-button__confirm');
    var startBtnUI = el.find('.save-button__start');
    var processBtnUI = el.find('.save-button__process');
    var carousel = el.find('.carousel');
    //adding widths
    var startTextWidth = (ctrl.config.startTextWidth) ? ctrl.config.startTextWidth : '100';
    var savingTextWidth = (ctrl.config.savingTextWidth) ? ctrl.config.savingTextWidth : '80';

    btnContainer.width( startTextWidth );
    startBtnUI.width( startTextWidth );
    processBtnUI.width( savingTextWidth );
    // Event
    ctrl.clickFn = function() {
      carousel.css('marginLeft', -(startTextWidth));
      btnContainer.addClass('save-button__confirm-processing');
      ctrl.onClick()
        .finally(function () {
          carousel.css('marginLeft', 0);
          btnContainer.removeClass('save-button__confirm-processing');
        });
    };
  };
}

saveButtonController.$inject = ['lodash'];

function saveButtonController(_) {
  var vm = this;
  var defaults = {
    startText: 'Save',
    savingText: 'Saving'
  };
// if the user won't provide config options it will fallback to the default options
  vm.config = angular.extend({}, defaults, vm.config);

  _.each(['start','saving'], function(i) {
    if (_.isArray(vm.config[i+'Text'])) {
      vm.config[i+'TextWidth'] = vm.config[i+'Text'][1];
      vm.config[i+'Text'] = vm.config[i+'Text'][0];
    }
  });
}