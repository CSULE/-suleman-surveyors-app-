// Service Worker for Suleman Surveyors App
// Enables offline functionality by caching assets and handling fetch requests

const CACHE_NAME = 'suleman-surveyors-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/storage.js',
  '/js/ai-service.js',
  '/js/ar-service.js',
  '/images/logo.png',
  '/images/report-icon.png',
  '/images/plan-icon.png',
  '/images/upload-icon.png',
  '/manifest.json',
  '/icons/favicon.ico',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
        
        // Not in cache - return the result from the live server
        // Clone the request because it's a one-time use stream
        return fetch(event.request.clone())
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();
            
            // Add the new response to the cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // If both cache and network fail, show a generic fallback
            if (event.request.url.indexOf('.html') > -1) {
              return caches.match('/index.html');
            }
            
            // If the request was for an image, show a default offline image
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match('/images/offline-image.png');
            }
            
            // Otherwise just return nothing
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle background sync for offline data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-projects') {
    event.waitUntil(syncProjects());
  } else if (event.tag === 'sync-issues') {
    event.waitUntil(syncIssues());
  }
});

// Sync projects when online
async function syncProjects() {
  // In a real app, this would send cached projects to the server
  // For the offline version, we'll just log a message
  console.log('Syncing projects...');
  return Promise.resolve();
}

// Sync issues when online
async function syncIssues() {
  // In a real app, this would send cached issues to the server
  // For the offline version, we'll just log a message
  console.log('Syncing issues...');
  return Promise.resolve();
}
