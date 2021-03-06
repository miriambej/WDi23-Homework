const state = {
  currentPage : 1,
  lastPage: false
}



const showImages = function (results) {
  const generateURL = function(photo){
    return [
      'http://farm',
      photo.farm,
      '.static.flickr.com/',
      photo.server,
      '/',
      photo.id,
      '_',
      photo.secret,
      '_q.jpg'// change the q for different sizes
    ].join('');
  };
  console.log(results);

  if(results.photos.page === results.photos.pages) {
    state.lastPage = true;
  }


  _(results.photos.photo).each(function(p){
    const imageURL = generateURL(p);
    const $img = $('<img>', {src: imageURL}); //equivalent .attr('src', imageURL)
    const $a = $('<a></a>', {href: 'http://flickr.com/', target: '_blank'});
    $a.html($img);
    $a.appendTo('#images')

  })
};



const searchFlickr = function (q) {

  if (state.lastPage){
    return;
  }

  console.log('Searching Flickr for', q);

  const flickrURL = 'https://api.flickr.com/services/rest/?jsoncallback=?';

  $.getJSON(flickrURL, {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084',
    text: q,
    format: 'json',
    page: state.currentPage++
  }).done(showImages);



};

$(document).ready(function () {
  $('#search').on('submit', function (e) {




    e.preventDefault();
    $('#images').empty();
    state.currentPage = 1;
    state.lastPage = false;

    const query = $('#query').val();

    searchFlickr( query );

  });

  $(window).on('scroll', _.throttle(function(){
    const documentHeight = $(document).height();
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();

    const scrollBottom = documentHeight - (scrollTop + windowHeight);
    if(countImages <= totalImages){
      if (scrollBottom < 500){
        const query = $('#query').val();
        searchFlickr( query );
      }
    }

  }, 500, {trailing:false}));



});
