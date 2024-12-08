const CACHE_NAME = "pwa-cache-v1";
const CACHE_ASSETS = [
  "./",
  "./index.html",
  "./styles/style.css",
  "./assets/Back.svg",
  "./assets/Go Web Store.svg",
  "./assets/No Results.svg",
  "./assets/Cancel.svg",
  "./assets/Microphone.svg",
  "./assets/Searchbar.svg",
  "./assets/Cover.png",
  "./assets/No Match Found.svg",
  "./assets/Share.svg",
  "./js/app.js",
  "./js/query-param.mjs",
  "./js/animated-logo.mjs",
  "./js/carousel-component.mjs",
  "./js/app-card.mjs",
  "./js/download-app.mjs",
  "./js/search-bar.mjs",
  "./js/app-details.mjs",
  "./js/get-apps.mjs",
  "./fonts/Lato-Bold.ttf",
  "./fonts/Lato-Regular.ttf",
  "./fonts/Material Symbols.woff",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
