var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

self.addEventListener("install", function(e) {
	console.log("['ServiceWorker'] Install");
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[Service Worker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("activate", function(e) {
	console.log('[Service worker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] removing old cache');
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});
