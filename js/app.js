if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(() => {

    console.log('Registration worked.');
   
  }).catch(error => {
  
    console.log('Registration failed with ' + error);
  });
}




/*
padding: 30px 15px 60px;
    text-align: center;
//navigator.serviceWorker.ready.then(reload);
const sw = navigator.serviceWorker;
var refreshing;
sw.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
});


self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
    if (requestUrl.pathname.startsWith('/photos/')) {
      event.respondWith(servePhoto(event.request));
      return;
    }
    // TODO: respond to avatar urls by responding with
    // the return value of serveAvatar(event.request)
  }



*/