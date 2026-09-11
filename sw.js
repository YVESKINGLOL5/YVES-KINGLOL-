const CACHE_NAME = 'chat-pk-pro-v2';
const assets = [
    './',
    './index.html',
    './chatpk.html',
    './dashboard.html',
    './index2.html',
    './admin.html',
    './library.html',
    './books.html',
    './about.html',
    './icon-192.png',
    './manifest.json'
];


self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('PWA Offline Cache Activated');
            return cache.addAll(assets);
        })
    );
});


self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('Clearing old cache bundle:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || fetch(e.request);
        })
    );
});