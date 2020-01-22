//registerer service worker

if( 'serviceWorker' in navigator ){

    navigator.serviceWorker.register('/sw.js')
    .then((reg)=>{
        console.info('service worker registered successfully')
    })
    .catch((error)=>{
        console.error('service worker not registered')
    })

}else{
    console.error('serviceworker is not supported in your browser')
}