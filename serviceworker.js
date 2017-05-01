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
      '/css/FullMDL2.ttf',
      '/css/FullMDL2.woff',
      '/css/styles.css',
      '/scripts/index.js',
      '/scripts/handlebars.js',
      '/templates/header.htm',
      '/templates/sidebar.htm'
    ]);
  });
}


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
return fetch(request).then(function(response){ return response})
}
