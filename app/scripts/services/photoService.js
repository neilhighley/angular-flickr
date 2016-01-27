'use strict';

/**
 * @ngdoc function
 * @name photostreamApp.service:PhotoService
 * @description
 * # PhotoService
 * # Service of the photostreamApp
 */
angular.module('photostreamApp')
.service('PhotoService',function($http){

  function parseData(d){

    var dataOut={ page: 1,
      pages: 1,
      total: d.items.length,
      results: d.items};

    var res=[];
    for(var i=0;i< d.items.length;i++){
      var photo= d.items[i];
      var photoOutUrl=photo.media.m;
      var photoOut={url:photoOutUrl,
                    id:i,
                    title:photo.title,
                    author:photo.author,
                    published:photo.published,
                    tags:photo.tags
                    };
      res.push(photoOut);
    }

    dataOut.results=res;
    return dataOut;
  }
  var success=function(resp,ss){
    var parsed=parseData(resp.data);

    var respOut={search:ss,
              results:parsed.results,
              status:1};

    return respOut;
  };
  var failure=function(data,ss){
    return {search:ss,results:data,status:-1};
  };

  var buildUrl=function(str){
    //use api
    var url='';

    //use public feed
    url='http://www.flickr.com/services/feeds/photos_public.gne?tags='+str+'&format=json&jsoncallback=JSON_CALLBACK&';

    return url;
  };

  var processRequest=function(str){
    return $http(
      {method: 'JSONP',
      url: buildUrl(str)})
      .then(
        function(response){return success(response,str);},
        function(response){return failure(response,str);}
    );

  };
 return {
   test:function(){
     return 'OK';
   },
   getPhotosBySearchString:function(searchString){
     return processRequest(searchString);
   }
 };
});
