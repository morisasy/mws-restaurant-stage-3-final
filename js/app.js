if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(() => {

    console.log('Registration worked.');
   
  }).catch(error => {
  
    console.log('Registration failed with ' + error);
  });
}

