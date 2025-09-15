// Minimal Service Worker for Ascension Lutheran Church
// Only essential caching, no aggressive offline detection

const CACHE_NAME = 'alc-minimal-v1';
const OFFLINE_URL = '/offline.html';

// Essential files only
const ESSENTIAL_CACHE_URLS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/components.css',
  '/js/app.js',
  '/content/content.js',
  '/images/Color Luther Rose - 72 dpi.jpg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  console.log('🏛️ Service Worker: Installing minimal version');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🏛️ Service Worker: Caching essential files');
        return cache.addAll(ESSENTIAL_CACHE_URLS);
      })
      .then(() => {
        console.log('🏛️ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('🏛️ Service Worker: Installation failed', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('🏛️ Service Worker: Activating minimal version');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🏛️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control
      self.clients.claim()
    ])
  );
});

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
  
  // Simple network-first strategy with minimal caching
  event.respondWith(
    fetch(request)
      .then(response => {
        // If network succeeds, optionally cache essential resources
        if (response.ok && isEssentialResource(request)) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Only serve from cache if network fails
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // For navigation requests, show basic offline page
          if (request.mode === 'navigate') {
            return new Response(`
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <title>Offline - Ascension Lutheran</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; 
                      text-align: center; 
                      padding: 2rem; 
                      background: linear-gradient(135deg, #8B0000, #660000);
                      color: white;
                      min-height: 100vh;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin: 0;
                    }
                    .container { 
                      max-width: 400px; 
                      background: rgba(255, 255, 255, 0.1);
                      padding: 2rem;
                      border-radius: 16px;
                      backdrop-filter: blur(10px);
                    }
                    h1 { margin-bottom: 1rem; }
                    .cross { font-size: 3rem; margin: 1rem 0; }
                    .btn {
                      background: white;
                      color: #8B0000;
                      padding: 0.75rem 1.5rem;
                      border: none;
                      border-radius: 8px;
                      font-weight: 600;
                      cursor: pointer;
                      margin: 0.5rem;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="cross">✚</div>
                    <h1>You're Offline</h1>
                    <p>Please check your connection and try again.</p>
                    <button class="btn" onclick="window.location.reload()">Try Again</button>
                  </div>
                </body>
              </html>
            `, {
              headers: { 'Content-Type': 'text/html' }
            });
          }
          
          // For other requests, return a basic response
          return new Response('Content not available offline', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// Helper function to identify essential resources
function isEssentialResource(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  return (
    pathname === '/' ||
    pathname === '/index.html' ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.includes('content.js') ||
    pathname.includes('Color Luther Rose')
  );
}

console.log('🏛️ Minimal Service Worker loaded');
