const CACHE_NAME = 'my-site-cache-v2';
const urlsToCache = ['./assets', './index.html'];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
