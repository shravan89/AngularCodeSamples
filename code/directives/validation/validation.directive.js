'use strict';

module.exports = validationMessages;

validationMessages.$inject = ['$compile'];

function validationMessages($compile) {

  var directive = {
    link: link,
    restrict: 'A',
    require: '^form'
  };
  return directive;


  function link(scope, element, attrs, formCtrl) {
    var fieldName = attrs.name;

    if (!fieldName) {
      throw new Error("field name is required");
    }
    if (!formCtrl.$name) {
      throw new Error("form name is required");
    }

    if (!formCtrl.serverError || formCtrl.serverError !== "function") {
      formCtrl.serverError = function(fieldName, isError, errorText) {
        formCtrl[fieldName].$setValidity('server', !isError);
        formCtrl[fieldName].serverError = errorText;
      };
    }

    if (!formCtrl.setError || formCtrl.setError !== "function") {
      formCtrl.setError = function(fieldName, errorName, isError) {
        formCtrl[fieldName].$setValidity(errorName, !isError);
      };
    }

    if (!formCtrl.clearErrors || formCtrl.clearErrors !== "function") {
      formCtrl.clearErrors = function(fieldName) {
        for (var errorName in formCtrl[fieldName].$error) {
          formCtrl[fieldName].$setValidity(errorName, true);
        }
      };
    }

    var isRequired = !!(attrs.ngRequired !== undefined || attrs.required !== undefined);
    var isPattern = attrs.ngPattern !== undefined;
    var type = attrs.type;
    var isEmail = type === "email";
    var isMask = attrs.uiMask;
    var isMinlength = attrs.minlength !== undefined;
    var isMaxlength = attrs.maxlength !== undefined;
    var isMin = attrs.min !== undefined;
    var isMax = attrs.max !== undefined;
    var label = attrs.label;
    var otherMessages = {};
    if (attrs.validationMessages) {
      try {
        otherMessages = JSON.parse(attrs.validationMessages);
      }
      catch (e) {
        console.log(e);
      }
    }

    var topDiv = angular.element("<div>");
    //topDiv.attr("class", "input-block");
    topDiv.attr("ng-class",
        ["{'input-block--error': (", formCtrl.$name, ".", fieldName, ".$invalid && ", formCtrl.$name, ".", fieldName, ".$touched)}"]
            .join('')
    );

    //var labelEl = angular.element("<div>");
    //labelEl.addClass('input-block__label');
    //labelEl.html(label);
    //
    //topDiv.append(labelEl);

    //var placeHolderEl = angular.element("<div>");
    //placeHolderEl.addClass('placeholder');
    //topDiv.append(placeHolderEl);

    var messageEl = angular.element("<div>");
    messageEl.addClass('input-block__error-messages');
    messageEl.attr('ng-messages', [formCtrl.$name, ".", fieldName, ".$error"].join(''));

    topDiv.append(angular.element("<i>").addClass('fa fa-sort-asc input-block__carat'));

    var msgText = angular.element("<div>").addClass('input-block__error-text');

    if (isRequired) {
      var textEl = msgText.clone();
      textEl.html(label + ' is required');
      textEl.attr('ng-message', 'required');
      messageEl.append(textEl);
    }
    if (isEmail) {
      var textEl = msgText.clone();
      textEl.html(label + ' is in the wrong format');
      textEl.attr('ng-message', 'email');
      messageEl.append(textEl);
    }
    if (isPattern) {
      var textEl = msgText.clone();
      textEl.html(label + ' is in the wrong format');
      textEl.attr('ng-message', 'pattern');
      messageEl.append(textEl);
    }
    var textEl = msgText.clone();
    textEl.html(['{{', formCtrl.$name, ".", fieldName, ".serverError", '}}'].join(''));
    textEl.attr('ng-message', 'server');
    messageEl.append(textEl);

    if (isMask) {
      var textEl = msgText.clone();
      textEl.html(label + ' is in the wrong format');
      textEl.attr('ng-message', 'mask');
      messageEl.append(textEl);
    }

    if (isMinlength) {
      var textEl = msgText.clone();
      textEl.html(label + ' is too short');
      textEl.attr('ng-message', 'minlength');
      messageEl.append(textEl);
    }

    if (isMaxlength) {
      var textEl = msgText.clone();
      textEl.html(label + ' is too long');
      textEl.attr('ng-message', 'maxlength');
      messageEl.append(textEl);
    }

    for(var key in otherMessages) {
      var textEl = msgText.clone();
      textEl.html(label + ' ' + otherMessages[key]);
      textEl.attr('ng-message', key);
      messageEl.append(textEl);
    }

    topDiv.append(messageEl);
    $compile(topDiv)(scope);

    var parent = element.parent();
    var tempel = parent.find('[validation-directive]').detach();
    topDiv.find('.placeholder').replaceWith(tempel);
    parent.append(topDiv);

  }
}