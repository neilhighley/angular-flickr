/**
 * Created by neilhighley on 26/01/2016.
 */

'use strict';

var FlickrProvider=function(){



  return {
    search:function(str,s,f){
      var url='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=92981ff053efa127c1111c6aeaebc114&text=nasty&per_page=50&page=2&format=json&nojsoncallback=1&auth_token=72157663374212600-fc66b90afe2664d4&api_sig=90dc9ba0e283baf016f021ac3759a2da';
      console.log(s);
      console.log(f);

      url='photos.json?'+str;
      /*
      return $.ajax.get(url).then(
        function(response){return s(response,searchString);},
        function(response){return f(response,searchString);}
      );
      */
    },
    parse:function(data){
      console.log(data);
    }
  };

};

var photoProvider=new FlickrProvider();
console.log(photoProvider);
