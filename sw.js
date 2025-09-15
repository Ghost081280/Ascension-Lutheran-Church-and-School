// Service Worker for Ascension Lutheran Church PWA
// Provides offline functionality and caching strategies
// Version: 2025011410

const CACHE_NAME = 'alc-pwa-v2025011410'; // FIXED: Updated version for cache busting
const OFFLINE_URL = '/offline.html';

// Resources to cache immediately on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/css/main.css?v=2025011410',
  '/css/components.css?v=2025011410',
  '/js/app.js?v=2025011410',
  '/js/navigation.js?v=2025011410',
  '/js/components.js?v=2025011410',
  '/manifest.json',
  // Add critical images when available
  '/images/Color Luther Rose - 72 dpi.jpg',
  '/images/Pastor.png',
  '/images/favicon-32x32.png',
  '/images/apple-touch-icon.png',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
  // Offline page
  OFFLINE_URL
];

// Resources that should be cached on first access
const RUNTIME_CACHE_URLS = [
  // Images will be cached as they're accessed
  '/images/',
  // External resources
  'https://fonts.gstatic.com/',
  'https://www.youtube.com/',
  'https://www.facebook.com/'
];

self.addEventListener('install', (event) => {
  console.log('🏛️ Service Worker: Installing... v2025011410');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🏛️ Service Worker: Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('🏛️ Service Worker: Installation complete');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('🏛️ Service Worker: Installation failed', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('🏛️ Service Worker: Activating... v2025011410');
  
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
  
  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(request)) {
    // Static assets: Cache First
    event.respondWith(cacheFirst(request));
  } else if (isImageRequest(request)) {
    // Images: Cache First with fallback
    event.respondWith(cacheFirstWithFallback(request));
  } else if (isAPIRequest(request)) {
    // API requests: Network First
    event.respondWith(networkFirst(request));
  } else if (isNavigationRequest(request)) {
    // Navigation: Network First with offline fallback
    event.respondWith(navigationHandler(request));
  } else {
    // Everything else: Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Cache first failed', error);
    return new Response('Content not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function cacheFirstWithFallback(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Image request failed, serving placeholder');
    return createImagePlaceholder();
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🏛️ Service Worker: Network first fallback to cache');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

async function navigationHandler(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
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
    
    // Fall back to offline page
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Last resort: basic offline message
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Ascension Lutheran Church</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 2rem; 
              background: #f7fafc;
              color: #2d3748;
            }
            .container { 
              max-width: 500px; 
              margin: 0 auto;
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            h1 { color: #8B0000; }
            .cross { font-size: 3rem; margin: 1rem 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="cross">✚</div>
            <h1>You're Offline</h1>
            <p>This page is not available offline. Please check your internet connection and try again.</p>
            <p>You can still access cached pages by using the navigation menu.</p>
            <button onclick="window.history.back()">Go Back</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
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
  return url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/);
}

function isImageRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/);
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname;
}

function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Create placeholder for failed image requests
function createImagePlaceholder() {
  const svg = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f7fafc"/>
      <rect x="20%" y="20%" width="60%" height="60%" fill="#e2e8f0" rx="8"/>
      <circle cx="35%" cy="35%" r="8%" fill="#a0aec0"/>
      <polygon points="45%,55% 55%,45% 65%,55% 55%,65%" fill="#a0aec0"/>
      <text x="50%" y="80%" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#718096">
        Image unavailable offline
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

// Handle background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('🏛️ Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get stored form data from IndexedDB or localStorage
    const formData = await getStoredFormData();
    if (formData) {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Clear stored data after successful submission
        await clearStoredFormData();
        console.log('🏛️ Service Worker: Contact form synced successfully');
      }
    }
  } catch (error) {
    console.error('🏛️ Service Worker: Background sync failed', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('🏛️ Service Worker: Push notification received');
  
  const options = {
    body: 'You have a message from Ascension Lutheran Church',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    tag: 'church-notification',
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View Message',
        icon: '/images/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/images/action-dismiss.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || 'Ascension Lutheran Church';
  }
  
  event.waitUntil(
    self.registration.showNotification('Ascension Lutheran Church', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🏛️ Service Worker: Notification clicked', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
  // 'dismiss' action or no action - just close the notification
});

// Periodic background sync for content updates
self.addEventListener('periodicsync', (event) => {
  console.log('🏛️ Service Worker: Periodic sync triggered', event.tag);
  
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  try {
    // Update critical content in background
    const criticalUrls = ['/', '/css/main.css?v=2025011410', '/js/app.js?v=2025011410'];
    
    for (const url of criticalUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(url, response);
        }
      } catch (error) {
        console.log(`🏛️ Service Worker: Failed to update ${url}`, error);
      }
    }
    
    console.log('🏛️ Service Worker: Content updated successfully');
  } catch (error) {
    console.error('🏛️ Service Worker: Content update failed', error);
  }
}

// Utility functions for form data storage (would need IndexedDB implementation)
async function getStoredFormData() {
  // Implementation would depend on your form data storage strategy
  return null;
}

async function clearStoredFormData() {
  // Implementation would depend on your form data storage strategy
  return true;
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🏛️ Service Worker: Loaded successfully v2025011410');
