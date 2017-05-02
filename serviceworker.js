var CACHE = 'cache-and-update';
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});


//

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/index.htm',
      '/fullDetails.htm',
      '/searchREsults.htm',
      '/summaryPage.htm',
      '/data/data.json',
      '/data/data0.json',
      '/data/data1.json',
      '/css/FullMDL2.ttf',
      '/css/FullMDL2.woff',
      '/css/styles.css',
      '/scripts/index.js',
      '/scripts/chart.js',
      '/scripts/handlebars.js',
      '/templates/header.htm',
      '/templates/sidebar.htm'
    ]);
  });
}


function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cahche to go to the server and get it
return fetch(request).then(function(response){ return response})
}
