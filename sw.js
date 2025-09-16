// Fixed Service Worker for Ascension Lutheran Church PWA
// Version: 2025.01.15 - Minimal interference, focused caching

const CACHE_VERSION = 'alc-fixed-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const OFFLINE_URL = '/offline.html';

// Only essential static assets - NO HTML caching to avoid dynamic content issues
const STATIC_ASSETS = [
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
  '/images/Color Luther Rose - 72 dpi.jpg'
];

// External resources that can be cached safely
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
];

console.log('🏛️ Fixed Service Worker loading...');

// Install Event - Cache only static assets, NO HTML
self.addEventListener('install', (event) => {
  console.log('🏛️ Service Worker: Installing fixed version');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('🏛️ Service Worker: Caching static assets only');
      return cache.addAll(STATIC_ASSETS.concat(EXTERNAL_ASSETS));
    }).then(() => {
      console.log('🏛️ Service Worker: Installation complete, skipping waiting');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('🏛️ Service Worker: Installation failed', error);
    })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🏛️ Service Worker: Activating fixed version');
  
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

// Fetch Event - Network first for HTML, Cache first for static assets
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

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: NETWORK FIRST for HTML pages (no caching to avoid stale content)
    if (isHTMLRequest(request)) {
      return await networkFirstNoCache(request);
    }
    
    // Strategy 2: Cache First for static assets (CSS, JS, images)
    if (isStaticAsset(request)) {
      return await cacheFirst(request);
    }
    
    // Strategy 3: Cache First for fonts
    if (isFontRequest(request)) {
      return await cacheFirst(request);
    }
    
    // Strategy 4: Network Only for everything else
    return await fetch(request);
    
  } catch (error) {
    console.error('🏛️ Service Worker: Fetch error', error);
    return await handleFetchError(request);
  }
}

// Network First with NO caching for HTML to ensure fresh content
async function networkFirstNoCache(request) {
  try {
    console.log('🏛️ Fetching fresh HTML from network:', request.url);
    const networkResponse = await fetch(request);
    
    // DO NOT cache HTML responses to avoid serving stale content
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Network failed for HTML:', request.url);
    throw error;
  }
}

// Cache First for static assets only
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('🏛️ Serving from cache:', request.url);
    return cachedResponse;
  }
  
  console.log('🏛️ Fetching and caching static asset:', request.url);
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Error Handlers
async function handleFetchError(request) {
  const url = new URL(request.url);
  
  // For navigation requests, show offline page
  if (request.mode === 'navigate') {
    return new Response(createOfflinePage(), {
      headers: { 'Content-Type': 'text/html' },
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
  
  // For images, return fallback
  if (isImageRequest(request)) {
    return new Response(createFallbackImage(), {
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
function isHTMLRequest(request) {
  return request.destination === 'document' ||
         request.headers.get('accept')?.includes('text/html') ||
         request.url.endsWith('/') ||
         request.url.endsWith('.html');
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.json') ||
         STATIC_ASSETS.includes(url.pathname);
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

// Create fallback image
function createFallbackImage() {
  return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f7fafc"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="18" fill="#718096">
      Ascension Lutheran
    </text>
  </svg>`;
}

// Message Handler for communication with main app
self.addEventListener('message', (event) => {
  console.log('🏛️ Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🏛️ Fixed Service Worker for Ascension Lutheran Church - Ready');
