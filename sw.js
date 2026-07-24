const CACHE_NAME = 'coldcuts-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/feedback.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/logo.jpg',
  '/images/hero-bg.jpg',
  '/images/ref.jpg',
  '/images/about.svg',
  '/images/favicon-32x32.png',
  '/images/favicon-16x16.png',
  '/images/apple-touch-icon.png',
  '/images/android-chrome-192x192.png',
  '/images/android-chrome-512x512.png',
  '/images/feedback1.jpg',
  '/images/feedback2.jpg',
  '/images/feedback3.jpg',
  '/images/feedback4.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    }).catch(() => {
      if (event.request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});
