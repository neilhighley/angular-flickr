'use strict';

/**
 * @ngdoc function
 * @name photostreamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the photostreamApp
 */
angular.module('photostreamApp')
  .controller('MainCtrl', ['PhotoService','$scope','$q','$rootScope',function ($PhotoService,$scope,$q,$rootScope) {

    $scope.pictures=[];
    $scope.title='The Photos Title';
    $scope.currentResult={};
    $scope.searchText='';
    $scope.reqError='';
    $scope.quantityToShow=5;

    this.test=function(){
      return 'OK';
    };

    $scope.trimPictures=function(pics,num){

      if(pics===undefined){return;}
      if(num===undefined){num=$scope.quantityToShow;}

      var pictures=[];
      for(var i=0;i<pics.length;i++){
        if(i<num){
          pictures.push(pics[i]);
        }
      }
      return pictures;
    };

    function changeQuantityToShow(num){
      $scope.quantityToShow=num;

      $scope.pictures=$scope.trimPictures($scope.currentResult.results,num);

    }

    $rootScope.$on('changeQuantityToShow',function(val,args){
      changeQuantityToShow(args.quantity);
    });

    $scope.getPictures=function(str){
      $scope.title='search:'+str;

      var defer = $q.defer();
      $PhotoService.getPhotosBySearchString(str)
                            .then(function(data){
                                if(data.status===-1){
                                  //something happened
                                  $scope.currentResult={};
                                  $scope.pictures=[];
                                  $scope.reqError='Could not retrieve data';

                                }else {
                                  $scope.currentResult = data;
                                  $scope.pictures = $scope.trimPictures($scope.currentResult.results,$scope.quantityToShow);
                                  $scope.reqError='';
                                }
                                defer.resolve();
                            },
                            function(){
                              $scope.currentResult={};
                              $scope.pictures=[];
                              $scope.reqError='Could not retrieve data';
                              defer.resolve();
                            });
      return defer.promise;

    };

    $scope.DoSearch=function(){
      $scope.getPictures($scope.searchText);
    };
    $scope.DoSearchWithText=function(str){

      $scope.searchText=str;
      return $scope.getPictures(str);
    };
  }]);
