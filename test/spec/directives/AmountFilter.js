'use strict';

describe('uib-alert', function() {
  var element, scope, $compile, $templateCache, $timeout;

  beforeEach(module('ui.bootstrap.alert'));
  beforeEach(module('uib/template/alert/alert.html'));

  beforeEach(inject(function ($rootScope, _$compile_, _$templateCache_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;

    element = angular.element(
      '<div>' +
      '<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}"' +
      'close="removeAlert($index)">{{alert.msg}}' +
      '</uib-alert>' +
      '</div>');

    scope.alerts = [
      {msg: 'foo', type: 'success'},
      {msg: 'bar', type: 'error'},
      {msg: 'baz'}
    ];
  }));

});
