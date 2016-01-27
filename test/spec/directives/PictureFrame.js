'use strict';

describe('PictureFrame', function() {
  var element, scope, $compile, $templateCache, $timeout;

  beforeEach(inject(function ($rootScope, _$compile_, _$templateCache_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;

    element = angular.element(
      '<div>' +
      '</div>');


  }));

});
