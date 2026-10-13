const CACHE_NAME = 'iwriter-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './verbetes.json',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
