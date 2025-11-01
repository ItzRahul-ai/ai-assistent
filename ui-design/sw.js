const CACHE_NAME = 'nova-cache-v1';
const assets = ['index.html','manifest.json','icon-192.png','icon-512.png'];

self.addEventListener('install', e=> {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
