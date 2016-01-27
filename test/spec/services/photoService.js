'use strict';

describe('Service: PhotoService', function () {

  // load the controller's module
  beforeEach(module('photostreamApp'));

  var PhotoService, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_PhotoService_, $httpBackend) {

    PhotoService = _PhotoService_;
    httpBackend=$httpBackend;
  }));

  it('Service passes examination test',function(){
    expect(PhotoService.test()).toBe('OK');
  });


  it('returns expected parsed data on service call',function(){
    var searchString='somestring';
    var url='http://www.flickr.com/services/feeds/photos_public.gne?tags=somestring&format=json&jsoncallback=JSON_CALLBACK&';

    //url='/scripts/services/photos2.json';

    var d={
      'title': 'Recent Uploads tagged flower',
      'link': 'http://www.flickr.com/photos/tags/flower/',
      'description': '',
      'modified': '2016-01-26T19:32:24Z',
      'generator': 'http://www.flickr.com/',
      'items': [
        {
          'title': 'Planter Power',
          'link': 'http://www.flickr.com/photos/sketchpx/24003109984/',
          'media': {'m':'http://farm2.staticflickr.com/1593/24003109984_efe45bec73_m.jpg'},
          'date_taken': '2016-01-24T15:05:37-08:00',
          'description': ' <p><a href=\'http://www.flickr.com/people/sketchpx/\'>SketchPx Photography<\/a> posted a photo:<\/p> <p><a href=\'http://www.flickr.com/photos/sketchpx/24003109984/\' title=\'Planter Power\'><img src=\'http://farm2.staticflickr.com/1593/24003109984_efe45bec73_m.jpg\' width=\'240\' height=\'134\' alt=\'Planter Power\' /><\/a><\/p> ',
          'published': '2016-01-26T19:32:24Z',
          'author': 'nobody@flickr.com (SketchPx Photography)',
          'author_id': '130786066@N07',
          'tags': 'flower nature lines gardens botanical outdoors design sheffield pot repetition planter leading'
        },
        {
          'title': 'u_WP_20150228_10_33_21_Raw_60',
          'link': 'http://www.flickr.com/photos/124087695@N03/24630925735/',
          'media': {'m':'http://farm2.staticflickr.com/1531/24630925735_06cee6668a_m.jpg'},
          'date_taken': '2015-02-28T10:33:18-08:00',
          'description': ' <p><a href=\'http://www.flickr.com/people/124087695@N03/\'>valalolo<\/a> posted a photo:<\/p> <p><a href=\'http://www.flickr.com/photos/124087695@N03/24630925735/\' title=\'u_WP_20150228_10_33_21_Raw_60\'><img src=\'http://farm2.staticflickr.com/1531/24630925735_06cee6668a_m.jpg\' width=\'240\' height=\'170\' alt=\'u_WP_20150228_10_33_21_Raw_60\' /><\/a><\/p> ',
          'published': '2016-01-26T19:24:17Z',
          'author': 'nobody@flickr.com (valalolo)',
          'author_id': '124087695@N03',
          'tags': 'flower colour nature nokia phone natura slovakia natureshots naturelovers lumia nban lumia1020 pichitme lumialove nothingbutanokia nbancolour nbandown thelumians'
        }]
    };

    var dResults=[{ url: 'http://farm2.staticflickr.com/1593/24003109984_efe45bec73_m.jpg', id: 0, title: 'Planter Power', author: 'nobody@flickr.com (SketchPx Photography)', published: '2016-01-26T19:32:24Z', tags: 'flower nature lines gardens botanical outdoors design sheffield pot repetition planter leading' },
      { url: 'http://farm2.staticflickr.com/1531/24630925735_06cee6668a_m.jpg', id: 1, title: 'u_WP_20150228_10_33_21_Raw_60', author: 'nobody@flickr.com (valalolo)', published: '2016-01-26T19:24:17Z', tags: 'flower colour nature nokia phone natura slovakia natureshots naturelovers lumia nban lumia1020 pichitme lumialove nothingbutanokia nbancolour nbandown thelumians' }];

    var expectedSuccess={search:searchString,
                        results: dResults,
                        status:1};

    httpBackend.whenJSONP(url).respond(d);

    PhotoService.getPhotosBySearchString(searchString).then(function(response){
      console.log(response);
      expect(response).toEqual(expectedSuccess);

      //or as individual checks
      /*
      expect(response.search).toBe(searchString);
      expect(response.results.pictures.length).toBe(2);
      expect(response.results.pictures[0].name).toBe('item1');
      expect(response.results.pictures[0].id).toBe('12345654');
      expect(response.results.pictures[1].id).toBe('123456542');
      expect(response.status).toBe(1);//success status
      */
    });

    httpBackend.flush();
  });

});
