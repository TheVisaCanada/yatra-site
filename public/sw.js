const CACHE_NAME = 'baarik-yatra-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ancestral_village_landscape.jpg',
  '/voyage_road_vehicle.jpg',
  '/experience_card_1_nankana.jpg',
  '/experience_card_2_village.jpg',
  '/experience_card_3_charter.jpg',
  '/Darbar Sahib Kartarpur.jpg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch((err) => {
      console.log('Cache install failed:', err);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Skip MP4 files — videos use range requests (HTTP 206) which cannot be
  // safely cached by service workers. Pass them straight to the network.
  if (event.request.url.endsWith('.mp4')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        // Fetch from network in background to update cache (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            // Only cache full 200 responses — never cache 206 partial content
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {
            // Network failed, but we have cached version
          });
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Only cache full 200 responses — never cache 206 partial content
          if (networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.log('Fetch failed:', error);
          // Return offline fallback if available
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          throw error;
        });
    })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormSubmissions());
  }
});

async function syncFormSubmissions() {
  // Implementation for background sync
  console.log('Background sync triggered');
}
