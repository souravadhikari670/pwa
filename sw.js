const staticCacheName = 'site-static-v1'
const dynamicCacheName = 'site-dynamic-v1'

const assets = [
    '/',
    '/home.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/style.css',
    '/css/materialize.min.css',
    '/image/dish.png',
    '/manifest.json',
    '/screens/fallback.html',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
]

//cache size limit
const limitcachesize = (name, size) => {

    caches.open(name)
    .then((cache)=>{
        cache.keys()
        .then((keys)=>{
            if( keys.length > size ){
                cache.delete(keys[0])
                .then(()=>{
                    limitcachesize(name, size)
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

}

//install service worker
self.addEventListener('install', (event)=>{
    // console.log('service worker has been installed')

    event.waitUntil(

        caches.open(staticCacheName)
        .then((cache)=>{
            console.log('cashing assets')
            cache.addAll(assets)
        })
        .catch((error)=>{
            console.log(error)
        })
    )
})

//activate service worker
self.addEventListener('activate',(event)=>{
    // console.log('service worker has been activated')
    event.waitUntil(
        caches.keys()
        .then((keys)=>{
            // console.log(keys)
            return Promise.all( keys.filter( key => key !== staticCacheName && key !== dynamicCacheName ).map(key=> caches.delete(key)))
        })
        .catch((error)=>{
            console.log(error)
        })
    )
})

//fetch event
self.addEventListener('fetch',(event)=>{
    // console.log('fetch event',event)
    // event.respondWith(

    //     caches.match(event.request)
    //     .then((cacheResponce)=>{
    //         return cacheResponce || fetch( event.request ).then((fetchResponce)=>{

    //             return caches.open(dynamicCacheName).then((cache)=>{
    //                 cache.put(event.request.url, fetchResponce.clone())
    //                 limitcachesize( dynamicCacheName, 15 )
    //                 return fetchResponce
    //             }) 
    //         })
    //     })
    //     .catch(() => {
    //         if(event.request.url.indexOf('.html') > -1){
    //             return caches.match('/screens/fallback.html')
    //         }
    //     })

    // )
})