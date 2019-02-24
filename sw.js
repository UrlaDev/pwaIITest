//asignar nombre y versión de caché

const CACHE_NAME = 'v1_cache_vr_pwa';
// Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/wiki144.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',

]

//evento install
//instalación del service worker, guardar encaché los archivos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
         .then( cache => {
             return cache.addAll(urlsToCache)
                             .then(() => {
                                 self.skipWaiting();
                             })
                            
         }).catch(err => { console.log('no se ha registrado el caché',err)
           
        })
    )
})
//evento activate
//Que la app funcione sin conexión 
self.addEventListener('activate',  e => {
    console.log('es el activa te')
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys() //devuelve elementos actual del cache
              .then( cacheNames => {
                  console.log(cacheNames);
                  return Promise.all(
                      cacheNames.map(cacheName => {
                          if(cacheWhitelist.indexOf(cacheName) === -1){
                              //borrar elementos que no se necesitan
                              return caches.delete(cacheName);
                          }
                      })
                   )
              })
              .then(()=>{
                  self.clients.claim();
              })
    )
})
//evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
                    .then((response)=>{
                        if(response){
                            //devuelvo datos desde el cache
                            return response;
                        }
                            return fetch(e.request);
                        
                    })
                    .catch(err => { console.log('nerror del fetch',err)})

    );
});