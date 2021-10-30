/* eslint-disable no-restricted-globals */
var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = ['./assets', './index.html'];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
