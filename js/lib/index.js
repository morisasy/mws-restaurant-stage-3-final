'use strict';
/*
let restaurantsJSON,
request,
objectStore,
tx,
reateIndexedDB;
const dataStore= [];

const dbName = "dbRestaurant-static";
const URL = "http://localhost:1337/restaurants";
const opt = {credentials: 'include'};
var db;

const dbVersion = 1; // Use a long long for this value (don't use a float)
const dbStoreName = 'restaurants';


 // create DB function createIndexedDB()
function createIndexedDB() {

  if (!('indexedDB' in window)) {return null;}
  return idb.open(dbName, dbVersion, (upgradeDb) =>  {
    if (!upgradeDb.objectStoreNames.contains('restaurants')) {
      const store = upgradeDb.createObjectStore(dbStoreName, {keyPath: 'id'});
      //const store = upgradeDb.createObjectStore(dbStoreName);
      store.createIndex('name', 'name', {unique: true});
     // return store;
    }
  }); 
}

const dbPromise = createIndexedDB();



  // @param {string} dbs database name.
   // @param {string} store_name
   // @param {string} mode either "readonly" or "readwrite"
   
  function getObjectStore(dbs,storeName, mode) {
            let tx = dbs.transaction(storeName, mode);
        return tx.objectStore(storeName);
              
  }

//  add people to "people"
//let restaurantsStore = getObjectStore(dbStoreName,'readonly');

function saveData(restaurantsJSON) {
  let events = restaurantsJSON;
  console.log('restaurantsJSON ', events);
  
  return dbPromise.then(db => {
      if (!db) return;
     const store = getObjectStore(db,dbStoreName, 'readwrite');
        
    return Promise.all(events.map(event => store.add(event)))
    .catch(() => {
      //tx.abort();
      throw Error('Events were not added to the store');
    });
  });
}



// getting Data from server 
function getServerData(url, options) {
    
    return fetch(url,options).then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
}


function loadServerData(url, options) {
   getServerData(url, options)
        .then(serverData => {
          saveData(serverData);
        }).catch(err => { // if we can't connect to the server...
          console.log('Network requests have failed, this is expected if offline');
        });
}
let loadfromServer = loadServerData(URL, opt);
//let resultData(URL, opt);


// get local data
// get all restaurants

 function getLocalEventData() {
  
  return dbPromise.then(db => {
        if (!db) return;
        const store = getObjectStore(db,dbStoreName, 'readonly'); 
             // store.createIndex('by-name', 'name');   
        let nameIndex = store.index('name');
      return nameIndex.getAll();
  }).then((results) => {
        console.log('Retrieved data by id:', results);
      });
}

function getLocalData() {
  
  return dbPromise.then((db) => {
        if (!db) return;
        const store = getObjectStore(db,'restaurants', 'readonly');
        //const tx = db.transaction('restaurants', 'readonly');
        //const store = tx.objectStore('restaurants');
       
        return store.getAll();
      }).then((items) => {
        console.log('Restaurants by id:', items);
      });
}
let locaDataDb = getLocalData();
console.log('All Restaurants:', getLocalData);

let retrievedData = getLocalEventData();
//console.log("I catched You: ", retrievedData);
retrievedData.then(data => console.log( "I catched You: ",data));

function getAllData(){
    if (!db) return;
   return dbPromise.then((db) => {
    const store = getObjectStore(db,dbStoreName, 'readonly');
    return store.openCursor();
  });

}

*/