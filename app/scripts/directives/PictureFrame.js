'use strict';

angular.module('photostreamApp')
  .directive('pictureFrame', [function() {

  return {
    restrict: 'EC',
    templateUrl: 'templates/d/picture-frame.html',
    scope:{
      data:'=',
      cssClass:'@',
      doSearch:'='//uplink to containing controller
    },
    link:function(scope){
      scope.selectTag=function(tag){
        scope.doSearch(tag);
      };
    }

  };
}]);
