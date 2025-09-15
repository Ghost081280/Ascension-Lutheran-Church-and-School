// UPDATED Service Worker for Ascension Lutheran Church PWA
// Enhanced for mobile performance and reliability
// Version: 2025011415

const CACHE_NAME = 'alc-pwa-v2025011415'; // Updated version for cache busting
const OFFLINE_URL = '/offline.html';

// Resources to cache immediately on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/css/main.css?v=2025011415',
  '/css/components.css?v=2025011415',
  '/js/app.js?v=2025011415',
  '/js/navigation.js?v=2025011415',
  '/js/components.js?v=2025011415',
  '/content/content.js?v=2025011415',
  '/manifest.json',
  // Critical images
  '/images/Color Luther Rose - 72 dpi.jpg',
  '/images/Pastor.png',
  '/images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg',
  '/images/families.jpg',
  '/images/Ascension-Lutheran-School-5l01p65peb8ccskgkkck08s4s-1122.webp',
  // PWA icons
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
  // Offline page
  OFFLINE_URL
];

// Enhanced image preload list for better mobile performance
const IMAGE_CACHE_URLS = [
  '/images/Color Luther Rose - 72 dpi.jpg',
  '/images/Pastor.png',
  '/images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg',
  '/images/families.jpg',
  '/images/Ascension-Lutheran-School-5l01p65peb8ccskgkkck08s4s-1122.webp'
];

self.addEventListener('install', (event) => {
  console.log('🏛️ Service Worker: Installing... v2025011415');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🏛️ Service Worker: Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('🏛️ Service Worker: Pre-caching images for mobile');
        return caches.open(CACHE_NAME).then(cache => {
          return Promise.all(
            IMAGE_CACHE_URLS.map(url => {
              return fetch(url).then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              }).catch(error => {
                console.log('🏛️ Service Worker: Failed to cache image', url, error);
              });
            })
          );
        });
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
  console.log('🏛️ Service Worker: Activating... v2025011415');
  
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
      // Take control of all clients
      self.clients.claim()
    ])
  );
  
  console.log('🏛️ Service Worker: Activation complete');
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Enhanced mobile-first caching strategies
  if (isStaticAsset(request)) {
    // Static assets: Cache First with mobile optimization
    event.respondWith(cacheFirstMobile(request));
  } else if (isImageRequest(request)) {
    // Images: Cache First with mobile-optimized fallback
    event.respondWith(cacheFirstWithMobileFallback(request));
  } else if (isNavigationRequest(request)) {
    // Navigation: Network First with enhanced offline support
    event.respondWith(navigationHandlerMobile(request));
  } else if (isFontRequest(request)) {
    // Fonts: Cache First with long TTL
    event.respondWith(cacheFirstLongTTL(request));
  } else {
    // Everything else: Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Enhanced cache strategies for mobile performance

async function cacheFirstMobile(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Return cached version immediately for mobile speed
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request, {
      // Mobile-optimized fetch options
      mode: 'cors',
      cache: 'default'
    });
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      // Clone and cache for future use
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Cache first mobile failed', error);
    // Return a basic response for mobile fallback
    return new Response('Content not available offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

async function cacheFirstWithMobileFallback(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request, {
      mode: 'cors',
      cache: 'default'
    });
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Image request failed, serving mobile placeholder');
    return createMobileImagePlaceholder();
  }
}

async function navigationHandlerMobile(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request, {
      mode: 'navigate',
      cache: 'default'
    });
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Navigation offline, serving cached page');
    
    // Try to serve cached version of the same page
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try to serve the main page
    const mainPage = await caches.match('/');
    if (mainPage) {
      return mainPage;
    }
    
    // Fall back to offline page
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Last resort: mobile-optimized offline message
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
              padding: 2rem 1rem; 
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
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            h1 { color: white; margin-bottom: 1rem; }
            .cross { font-size: 3rem; margin: 1rem 0; opacity: 0.8; }
            .btn {
              background: white;
              color: #8B0000;
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              margin: 0.5rem;
              min-height: 48px;
              min-width: 120px;
            }
            .btn:hover { background: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="cross">✚</div>
            <h1>You're Offline</h1>
            <p>This page isn't available offline. Please check your connection and try again.</p>
            <button class="btn" onclick="window.history.back()">Go Back</button>
            <button class="btn" onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

async function cacheFirstLongTTL(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Serve from cache immediately for fonts
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Font request failed', error);
    return new Response('', { status: 404 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('🏛️ Service Worker: Network request failed', error);
    return cachedResponse;
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Helper functions to identify request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|json)$/);
}

function isImageRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/);
}

function isFontRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(woff|woff2|ttf|eot)$/) || 
         url.hostname === 'fonts.googleapis.com' || 
         url.hostname === 'fonts.gstatic.com';
}

function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Create mobile-optimized placeholder for failed image requests
function createMobileImagePlaceholder() {
  const svg = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f7fafc"/>
      <rect x="10%" y="25%" width="80%" height="50%" fill="#e2e8f0" rx="8"/>
      <circle cx="30%" cy="40%" r="8%" fill="#8B0000"/>
      <path d="M45 55 L55 45 L65 55 L55 65 Z" fill="#8B0000"/>
      <text x="50%" y="85%" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#718096">
        Image unavailable
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store'
    }
  });
}

// Enhanced background sync for mobile
self.addEventListener('sync', (event) => {
  console.log('🏛️ Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  } else if (event.tag === 'content-update') {
    event.waitUntil(updateContentCache());
  }
});

async function syncContactForm() {
  try {
    const formData = await getStoredFormData();
    if (formData) {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        await clearStoredFormData();
        console.log('🏛️ Service Worker: Contact form synced successfully');
      }
    }
  } catch (error) {
    console.error('🏛️ Service Worker: Background sync failed', error);
  }
}

async function updateContentCache() {
  try {
    const criticalUrls = [
      '/',
      '/css/main.css?v=2025011415',
      '/js/app.js?v=2025011415',
      '/content/content.js?v=2025011415'
    ];
    
    const cache = await caches.open(CACHE_NAME);
    
    for (const url of criticalUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch (error) {
        console.log(`🏛️ Service Worker: Failed to update ${url}`, error);
      }
    }
    
    console.log('🏛️ Service Worker: Content cache updated');
  } catch (error) {
    console.error('🏛️ Service Worker: Content update failed', error);
  }
}

// Enhanced push notification handling for mobile
self.addEventListener('push', (event) => {
  console.log('🏛️ Service Worker: Push notification received');
  
  const options = {
    body: 'You have a message from Ascension Lutheran Church',
    icon: '/images/Color Luther Rose - 72 dpi.jpg',
    badge: '/images/Color Luther Rose - 72 dpi.jpg',
    tag: 'church-notification',
    renotify: true,
    requireInteraction: false,
    vibrate: [200, 100, 200], // Mobile vibration pattern
    actions: [
      {
        action: 'view',
        title: 'View Message',
        icon: '/images/Color Luther Rose - 72 dpi.jpg'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  if (event.data) {
    try {
      const data = event.data.json();
      options.body = data.body || options.body;
      options.title = data.title || 'Ascension Lutheran Church';
    } catch (error) {
      console.log('🏛️ Service Worker: Push data parsing failed', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('Ascension Lutheran Church', options)
  );
});

// Handle notification clicks with mobile optimization
self.addEventListener('notificationclick', (event) => {
  console.log('🏛️ Service Worker: Notification clicked', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if app not open
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Periodic background sync for content updates
self.addEventListener('periodicsync', (event) => {
  console.log('🏛️ Service Worker: Periodic sync triggered', event.tag);
  
  if (event.tag === 'content-update') {
    event.waitUntil(updateContentCache());
  }
});

// Mobile-specific performance optimizations
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'CACHE_IMAGES') {
    // Pre-cache images on demand for mobile
    event.waitUntil(cacheImagesOnDemand(event.data.images));
  }
});

async function cacheImagesOnDemand(imageUrls) {
  const cache = await caches.open(CACHE_NAME);
  
  for (const url of imageUrls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.log('🏛️ Service Worker: Failed to cache image on demand', url, error);
    }
  }
}

// Utility functions for form data storage
async function getStoredFormData() {
  // Implementation would depend on IndexedDB or other storage strategy
  return null;
}

async function clearStoredFormData() {
  // Implementation would depend on storage strategy
  return true;
}

// Mobile performance monitoring
self.addEventListener('install', (event) => {
  console.log('🏛️ Service Worker: Mobile-optimized version installed v2025011415');
});

console.log('🏛️ Service Worker: Loaded successfully v2025011415 - Mobile Enhanced');
