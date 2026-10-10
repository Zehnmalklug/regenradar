// Cacht nur die App-Hülle. Radarbilder und Karten kommen immer frisch aus dem Netz.
const CACHE = "regenradar-v12";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Feste Bibliotheks- und Icon-Dateien: aus dem Cache, damit die App schneller startet
  if (url.host === "unpkg.com" || url.host === "fonts.googleapis.com" || url.host === "fonts.gstatic.com") {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok || r.type === "opaque") caches.open(CACHE).then(c => c.put(e.request, r.clone()));
      return r;
    })));
    return;
  }
  if (url.origin !== location.origin) return; // DWD, Karten, Bright Sky: immer frisch aus dem Netz
  e.respondWith(
    fetch(e.request)
      .then(r => { caches.open(CACHE).then(c => c.put(e.request, r.clone())); return r; })
      .catch(() => caches.match(e.request))
  );
});
