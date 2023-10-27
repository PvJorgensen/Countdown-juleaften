const staticCacheName = "Site-static-V1.2" 
const dynamicCacheName = "Site-dynamic-V1.0"
const assets = [
    './assets/css/main.css',
    './assets/js/myscript.js',
    './index.html',
    './manifest.json',
    './serviceWorker.js'
];


if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceWorker.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}

// Installere service worker
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('Skriver filer til cache')
		// Tilføj flere filer
		cache.addAll(assets); 
	  }))
	console.log('Service Worker has been installed');
})

// Aktivere Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
	event.waitUntil(
		caches.keys().then(keys=>{
			const oldCaches = keys.filter(key => key !== staticCacheName)
			oldCaches.map(key=>caches.delete(key))
		})
	)
})

// Fetch event
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cacheRes => {
			return cacheRes || fetch(event.request).then(fetchRes => {
				return caches.open(dynamicCacheName).then(cache => {
					cache.put(event.request.url, fetchRes.clone())
					return fetchRes
				})
			})
		}).catch(() => {
			return caches.match('./pages/fallback.html')
		})
	)
	// console.log('Fetch event', event)
})
