let restaurant;
var map;
let restaurantID;
let currentRestaurant;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
}

/**
 *  Create an element.
 */
 function createNode(el){
   return document.createElement(el);
 }
/**
 *  Append an element to the parent.
 */
 function append(parent, el) {
   return parent.appendChild(el);
 }

/**
 *  Get / Post / Put data to the server.
 */
function getServerData(url,options) {
  return fetch(url,options).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}
/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    // assign the restaurantID value.
    restaurantID = id;
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.alt = restaurant.name;
  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = createNode('tr');

    const day = createNode('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = createNode('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = createNode('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);
  //let currentRestaurant;
  //var reviews1;
  const id = getParameterByName('id');
  const option = {
    credentials: 'include'
    };
  const url = `http://localhost:1337/reviews/?restaurant_id=${id}`;
  const ul = document.getElementById('reviews-list');
  //var currentRestaurant;
  //let dbPromise = DBHelper.createIndexedDB();
    //DBHelper.fetchReviewsById(id);
    //getServerData(url,option)
    DBHelper.serverPostGetPut(url,option)
          .then(json => {
            const restaurantReviews = json;
            let reviews = json;
           currentRestaurant = restaurantReviews;
          console.log("current Reviews: ", json);

          if (!reviews) {
            const noReviews = document.createElement('p');
            noReviews.innerHTML = 'No reviews yet!';
            container.appendChild(noReviews);
            return;
          }

          //const ul = document.getElementById('reviews-list');
          reviews.forEach(review => {
            ul.appendChild(createReviewHTML(review));
          });
          container.appendChild(ul);
         // DBHelper.addReviewsToIndexDB(reviews);
                 
          })
        .catch((error) => {
          console.log('There has been a problem with your fetch operation: ', error.message);
          //callback(error, null);
          let offlineReviews= DBHelper.getLocalDataByID('reviews', 'restaurant', id);
                      offlineReviews.then((storedReviews) => {
                      console.log('Looking for local data in indexedDB: ',storedReviews);
                      storedReviews.forEach(review => {
                        ul.appendChild(createReviewHTML(review));
                      });
                      container.appendChild(ul);
                      //return Promise.resolve(storedReviews);
                    });
    });
  
}

/**
 * Create review HTML and add it to the webpage.

 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = `Name: ${review.name}`;
  li.appendChild(name);

  const date = document.createElement('p');
  let dateObject = new Date(Date.parse(review.createdAt));
  date.innerHTML =`Date: ${dateObject.toDateString()}`;
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


    
   
  const formEl = document.getElementById("formcomment");
  //const submitBtn = document.querySelector('button');
 


  function getData(){
     // get form data Name, comment , a rate.
     const commentorName = document.getElementById("username").value;
     const aComment = document.querySelector("textarea").value;
     const starList = document.getElementsByName("star");

     let aRate =1
     for (let i = 0; i < starList.length; i++) {
         if (starList[i].checked) {
             aRate = starList[i].value;
         }
     }
     
     //const urlsReviews = 'http://localhost:1337/reviews/';
     const formData = {
         restaurant_id: parseInt(restaurantID),
         name: commentorName,
         rating: parseInt(aRate),
         comments: aComment,
         createdAt: new Date()
     };
     return formData;
  }
    
  function postReview() {
     event.preventDefault();
     DBHelper.addReviews(reviews)
       const urlsReviews = 'http://localhost:1337/reviews/';
   
       let reviewData = getData();
       let offlineData = reviewData;
        //console.log("New comment posted :", jsonData);
        //DBHelper.saveData(jsonData);
         
       
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(reviewData);
        let opts = {
          method: 'POST',
          mode: 'no-cors',
          cache: "no-cache",
          credentials: 'same-origin',
          headers: headers,
          body: body
        }; 
  const id = getParameterByName('id');
  //DBHelper.fetchReviewsById(id);
  if (navigator.onLine) {
      
     // DBHelper.addReviewsToIndexDB(offlineData, parseInt(id));
     // const id = getParameterByName('id');
     
  
     DBHelper.serverPostGetPut(urlsReviews, opts);
     DBHelper.fetchReviewsById(id);
        

    } else {
        var offlineDataToStore = DBHelper.setLocalStorage(offlineData);
    }
    //DBHelper.fetchReviewsById(id);
    document.forms["formcomment"].reset(); 
    
 } 
 