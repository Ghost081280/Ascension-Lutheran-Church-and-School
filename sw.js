// Enhanced Service Worker for Ascension Lutheran Church PWA
// Version: 2025.01.15 - Comprehensive offline support and caching

const CACHE_VERSION = 'alc-v2025-01-15';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGES_CACHE = `${CACHE_VERSION}-images`;
const OFFLINE_URL = '/offline.html';
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y3ZmFmYyIvPiA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzcxODA5NiI+QXNjZW5zaW9uIEx1dGhlcmFuPC90ZXh0Pjwvc3ZnPg==';

// Static assets to precache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/components.css',
  '/css/loading.css',
  '/css/pwa.css',
  '/js/app.js',
  '/js/components.js',
  '/js/navigation.js',
  '/content/content.js',
  '/manifest.json',
  '/images/Rose_ColorThumb.png',
  '/images/Color Luther Rose - 72 dpi.jpg',
  '/offline.html'
];

// Essential fonts and external resources
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
];

console.log('🏛️ Enhanced Service Worker loading...');

// Install Event - Precache static assets
self.addEventListener('install', (event) => {
  console.log('🏛️ Service Worker: Installing enhanced version');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('🏛️ Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.concat(EXTERNAL_ASSETS));
      }),
      // Ensure offline page is cached
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.add(OFFLINE_URL).catch(() => {
          // Create basic offline page if file doesn't exist
          const offlineResponse = new Response(createOfflinePage(), {
            headers: { 'Content-Type': 'text/html' }
          });
          return cache.put(OFFLINE_URL, offlineResponse);
        });
      })
    ]).then(() => {
      console.log('🏛️ Service Worker: Installation complete, skipping waiting');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('🏛️ Service Worker: Installation failed', error);
    })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🏛️ Service Worker: Activating enhanced version');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.startsWith(CACHE_VERSION)) {
              console.log('🏛️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take immediate control
      self.clients.claim()
    ]).then(() => {
      console.log('🏛️ Service Worker: Activation complete');
    })
  );
});

// Fetch Event - Advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

// Enhanced fetch handler with multiple strategies
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache First for static assets
    if (isStaticAsset(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 2: Network First for HTML pages
    if (isHTMLRequest(request)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Strategy 3: Cache First for images with fallback
    if (isImageRequest(request)) {
      return await cacheFirstWithFallback(request, IMAGES_CACHE, FALLBACK_IMAGE);
    }
    
    // Strategy 4: Stale While Revalidate for fonts and external resources
    if (isFontRequest(request) || isExternalResource(request)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Strategy 5: Network Only for everything else
    return await networkOnly(request);
    
  } catch (error) {
    console.error('🏛️ Service Worker: Fetch error', error);
    return await handleFetchError(request);
  }
}

// Caching Strategies

// Cache First - Check cache first, fallback to network
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('🏛️ Serving from cache:', request.url);
    return cachedResponse;
  }
  
  console.log('🏛️ Fetching from network:', request.url);
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network First - Try network first, fallback to cache
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    console.log('🏛️ Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Network failed, trying cache:', request.url);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache First with Fallback for images
async function cacheFirstWithFallback(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('🏛️ Image failed, using fallback:', request.url);
    return new Response(fallbackUrl, {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
}

// Stale While Revalidate - Serve from cache, update in background
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Start fetch in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.log('🏛️ Background fetch failed:', request.url, error);
  });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return fetchPromise;
}

// Network Only - Always fetch from network
async function networkOnly(request) {
  return fetch(request);
}

// Error Handlers

async function handleFetchError(request) {
  const url = new URL(request.url);
  
  // For navigation requests, show offline page
  if (request.mode === 'navigate') {
    const cache = await caches.open(STATIC_CACHE);
    const offlineResponse = await cache.match(OFFLINE_URL);
    
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Create basic offline response
    return new Response(createOfflinePage(), {
      headers: { 'Content-Type': 'text/html' },
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
  
  // For images, return fallback
  if (isImageRequest(request)) {
    return new Response(FALLBACK_IMAGE, {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
  
  // For other requests, return error response
  return new Response('Content not available offline', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Helper Functions

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.json') ||
         url.pathname === '/' ||
         url.pathname === '/index.html' ||
         STATIC_ASSETS.includes(url.pathname);
}

function isHTMLRequest(request) {
  return request.destination === 'document' ||
         request.headers.get('accept').includes('text/html');
}

function isImageRequest(request) {
  return request.destination === 'image' ||
         /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(new URL(request.url).pathname);
}

function isFontRequest(request) {
  return request.destination === 'font' ||
         /\.(woff|woff2|ttf|eot)$/i.test(new URL(request.url).pathname) ||
         new URL(request.url).hostname === 'fonts.gstatic.com';
}

function isExternalResource(request) {
  const url = new URL(request.url);
  return url.hostname !== self.location.hostname;
}

// Create basic offline page HTML
function createOfflinePage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Ascension Lutheran Church</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #8B0000, #660000);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 1rem;
        }
        .container {
            max-width: 400px;
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 16px;
            backdrop-filter: blur(10px);
        }
        .cross { font-size: 3rem; margin: 1rem 0; }
        h1 { margin-bottom: 1rem; font-size: 2rem; }
        p { margin-bottom: 1.5rem; line-height: 1.6; }
        .btn {
            background: white;
            color: #8B0000;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin: 0.5rem;
            transition: transform 0.2s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        .info {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="cross">✚</div>
        <h1>You're Offline</h1>
        <p>Don't worry - some content is still available while you're offline.</p>
        <div class="info">
            <strong>Sunday Worship:</strong><br>
            8:00 AM & 10:45 AM<br><br>
            <strong>Phone:</strong> (260) 486-2226<br>
            <strong>Address:</strong> 8811 St. Joe Road<br>
            Fort Wayne, IN 46835
        </div>
        <button class="btn" onclick="window.location.reload()">Try Again</button>
        <button class="btn" onclick="window.history.back()">Go Back</button>
    </div>
    <script>
        // Auto-reload when connection is restored
        window.addEventListener('online', () => {
            setTimeout(() => window.location.reload(), 1000);
        });
    </script>
</body>
</html>
  `;
}

// Background Sync (if supported)
self.addEventListener('sync', (event) => {
  console.log('🏛️ Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Perform background tasks like updating cache, syncing data, etc.
    console.log('🏛️ Service Worker: Performing background sync');
    
    // Update dynamic cache with fresh content
    const cache = await caches.open(DYNAMIC_CACHE);
    
    // Pre-fetch important pages
    const importantPages = ['/', '/#church', '/#worship', '/#contact'];
    await Promise.all(
      importantPages.map(async (page) => {
        try {
          const response = await fetch(page);
          if (response.ok) {
            await cache.put(page, response);
          }
        } catch (error) {
          console.log('🏛️ Background sync failed for', page, error);
        }
      })
    );
    
  } catch (error) {
    console.error('🏛️ Service Worker: Background sync failed', error);
  }
}

// Push Notifications (basic setup)
self.addEventListener('push', (event) => {
  console.log('🏛️ Service Worker: Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Ascension Lutheran Church',
    icon: '/images/Rose_ColorThumb.png',
    badge: '/images/Rose_ColorThumb.png',
    tag: 'alc-notification',
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Ascension Lutheran Church', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  console.log('🏛️ Service Worker: Notification clicked', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message Handler for communication with main app
self.addEventListener('message', (event) => {
  console.log('🏛️ Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Trigger cache update
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  try {
    console.log('🏛️ Service Worker: Updating cache');
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(STATIC_ASSETS);
    console.log('🏛️ Service Worker: Cache updated successfully');
  } catch (error) {
    console.error('🏛️ Service Worker: Cache update failed', error);
  }
}

// Periodic cleanup
setInterval(() => {
  // Clean up old cache entries periodically
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      if (!cacheName.startsWith(CACHE_VERSION)) {
        caches.delete(cacheName);
      }
    });
  });
}, 24 * 60 * 60 * 1000); // Daily cleanup

console.log('🏛️ Enhanced Service Worker for Ascension Lutheran Church - Ready');
