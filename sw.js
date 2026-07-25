const CACHE_NAME = 'coldcuts-v4';

const BASE = new URL(self.registration.scope).pathname;

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'feedback.html',
  BASE + 'style.css',
  BASE + 'script.js',
  BASE + 'manifest.json',
  BASE + 'images/logo.jpg',
  BASE + 'images/hero-bg.jpg',
  BASE + 'images/ref.jpg',
  BASE + 'images/about.svg',
  BASE + 'images/favicon-32x32.png',
  BASE + 'images/favicon-16x16.png',
  BASE + 'images/apple-touch-icon.png',
  BASE + 'images/android-chrome-192x192.png',
  BASE + 'images/android-chrome-512x512.png',
  BASE + 'images/feedback1.jpg',
  BASE + 'images/feedback2.jpg',
  BASE + 'images/feedback3.jpg',
  BASE + 'images/feedback4.jpg'
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
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }
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
    })
  );
});
