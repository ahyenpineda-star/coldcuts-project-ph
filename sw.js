const CACHE_NAME = 'coldcuts-v8';

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
  BASE + 'images/feedback4.jpg',
  BASE + 'images/gallery-new-1.jpg',
  BASE + 'images/gallery-new-2.jpg',
  BASE + 'images/gallery-new-3.jpg',
  BASE + 'images/gallery-new-4.jpg',
  BASE + 'images/gallery-new-5.jpg',
  BASE + 'images/gallery-new-6.jpg',
  BASE + 'images/gallery-new-7.jpg',
  BASE + 'images/gallery-new-8.jpg',
  BASE + 'images/gallery-new-9.jpg',
  BASE + 'images/gallery-new-10.jpg',
  BASE + 'images/gallery-new-11.jpg',
  BASE + 'images/gallery-new-12.jpg',
  BASE + 'images/gallery-new-13.jpg',
  BASE + 'images/gallery-new-14.jpg',
  BASE + 'images/gallery-new-15.jpg',
  BASE + 'images/gallery-new-16.jpg',
  BASE + 'images/gallery-new-17.jpg',
  BASE + 'images/gallery-new-18.jpg',
  BASE + 'images/gallery-new-19.jpg',
  BASE + 'images/gallery-new-20.jpg',
  BASE + 'images/gallery-new-21.jpg',
  BASE + 'images/gallery-new-22.jpg',
  BASE + 'images/gallery-new-23.jpg',
  BASE + 'images/gallery-new-24.jpg',
  BASE + 'images/gallery-new-25.jpg',
  BASE + 'images/gallery-new-26.jpg',
  BASE + 'images/gallery-new-27.jpg',
  BASE + 'images/gallery-new-28.jpg',
  BASE + 'images/gallery-new-29.jpg',
  BASE + 'images/gallery-new-30.jpg',
  BASE + 'images/gallery-new-31.jpg',
  BASE + 'images/gallery-new-32.jpg',
  BASE + 'images/gallery-new-33.jpg',
  BASE + 'images/gallery-new-34.jpg',
  BASE + 'images/gallery-new-35.jpg',
  BASE + 'images/gallery-new-36.jpg'
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
