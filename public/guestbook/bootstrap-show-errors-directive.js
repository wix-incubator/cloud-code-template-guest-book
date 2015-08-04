//This is almost the same as https://github.com/paulyoder/angular-bootstrap-show-errors TODO decide if we use the bower component for the tutorial.
angular.module('guestbook').directive('showErrors', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    require: '^form',
    link: function (scope, el, attrs, formCtrl) {
      var inputEl = el[0].querySelector("[name]");
      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');
      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        if (formCtrl[inputName].$touched) {
          toggleClasses(invalid);
        }
      });

      scope.$on('show-errors-check-validity', function () {
        toggleClasses(formCtrl[inputName].$invalid);
      });
      
      scope.$on('show-errors-reset', function () {
        $timeout(function () {
          el.removeClass('has-error');
        }, 0, false);
      });

      function toggleClasses(invalid) {
        el.toggleClass('has-error', invalid);
      }
    }
  };
}]);
