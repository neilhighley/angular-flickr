'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('photostreamApp'));

  var MainCtrl,
    scope,
    mockServiceObject;

  mockServiceObject={
          getPhotosBySearchString: function (searchString) {

            var resp = {
              search: searchString,
              results: [
                {
                  url: 'https://farm2.staticflickr.com/1556/23934547294_33742dc13e.jpg',
                  id: '23934547294',
                  title: 'rusVan collection Garbage Pail Kids cheap toy toys 1985 MUSCLETHINGS Nasty Nick 1a Jim Rogers custom adam bomb Apoon Goon logo close up russ vandiver russell',
                  owner: '48543097@N04'
                },
                {
                  url: 'https://farm2.staticflickr.com/1680/24562712525_e580da8b89.jpg',
                  id: '24562712525',
                  title: 'rusVan collection Garbage Pail Kids cheap toy toys 1985 neon purple nasty nick custom musclethings adam bomb Apoon Goon logo close up russ vandiver russell',
                  owner: '48543097@N04'
                }
              ],
              page: 2,
              pages: '4401',
              status: 1
            };
            return resp;
          },

        test: function () {
          return 'OK';
        }

};



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,$q) {
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      PhotoService: mockServiceObject,
      $scope: scope
    });
    spyOn(mockServiceObject, 'getPhotosBySearchString').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({fo:'bar'});
      return deferred.promise;
    });


  }));


  it('should return OK if controller', function () {
    expect(MainCtrl.test()).toBe('OK');
  });

  it('should return title', function () {
    expect(scope.title).toBe('The Photos Title');
  });

  it('should populate results after a search term is recieved',function(){
    var searchString='somestring';
    var expected={
      search:searchString ,
      results: [
        {
          url: 'https://farm2.staticflickr.com/1556/23934547294_33742dc13e.jpg',
          id: '23934547294',
          title: 'rusVan collection Garbage Pail Kids cheap toy toys 1985 MUSCLETHINGS Nasty Nick 1a ' +
          'Jim Rogers custom adam bomb Apoon Goon logo close up russ vandiver russell',

        },
        { url: 'http://farm2.staticflickr.com/1531/24630925735_06cee6668a_m.jpg',
          id: 1,
          title: 'u_WP_20150228_10_33_21_Raw_60',
          author: 'nobody@flickr.com (valalolo)',
          published: '2016-01-26T19:24:17Z', tags: 'flower colour nature nokia phone natura slovakia natureshots ' +
        'naturelovers lumia nban lumia1020 pichitme lumialove nothingbutanokia nbancolour nbandown thelumians' }
      ],
      status: 1
    };

    scope.DoSearchWithText(searchString).then(function(){
      expect(scope.currentResult.results[1]).toEqual(expected.results[1]);
      expect(scope.pictures).toEqual(expected.results);
      expect(scope.searchText).toEqual(searchString);
    });

  });

  it('should trim the results down ready to be placed in pictures',function(){
    var arr=[{pic:'data1'},
      {pic:'data2'},
      {pic:'data3'},
      {pic:'data4'},
      {pic:'data5'},
      {pic:'data6'},
      {pic:'data7'}
    ];
    expect(scope.trimPictures(arr,3).length).toEqual(3);
    expect(scope.trimPictures(arr,7).length).toEqual(7);
    expect(scope.trimPictures(arr,0).length).toEqual(0);
    expect(scope.trimPictures(arr,13).length).toEqual(7);

  });

  it('should populate results and pictures after service call',function(){
    var searchString='somestring';
    var expected={
      search:searchString ,
      results: [
        {
          url: 'https://farm2.staticflickr.com/1556/23934547294_33742dc13e.jpg',
          id: '23934547294',
          title: 'rusVan collection Garbage Pail Kids cheap toy toys 1985 MUSCLETHINGS Nasty Nick 1a ' +
          'Jim Rogers custom adam bomb Apoon Goon logo close up russ vandiver russell',

        },
        { url: 'http://farm2.staticflickr.com/1531/24630925735_06cee6668a_m.jpg',
          id: 1,
          title: 'u_WP_20150228_10_33_21_Raw_60',
          author: 'nobody@flickr.com (valalolo)',
          published: '2016-01-26T19:24:17Z', tags: 'flower colour nature nokia phone natura slovakia natureshots ' +
        'naturelovers lumia nban lumia1020 pichitme lumialove nothingbutanokia nbancolour nbandown thelumians' }
      ],
      status: 1
    };

    scope.getPictures(searchString).then(function(){
      expect(scope.currentResult.results[1]).toEqual(expected.results[1]);
      expect(scope.pictures).toEqual(expected.results);
    });

  });


});
