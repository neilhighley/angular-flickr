'use strict';


angular.module('photostreamApp')
  .directive('amountFilter', function($rootScope) {

    return {
      restrict: 'EC',
      templateUrl: 'templates/d/amount-filter.html',
      scope:{
        quantity:'@',
        cssClass:'@'
      },
      link:function(scope){
        $rootScope.$broadcast('changeQuantityToShow',{quantity:scope.quantity});

        scope.changeAmountToShow=function(){
          $rootScope.$broadcast('changeQuantityToShow',{quantity:scope.quantity});
        };


      }
    };
  });

