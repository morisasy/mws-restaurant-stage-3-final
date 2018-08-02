let restaurant;
var map;
let restaurantID;

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
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
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
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}
 
 function createNode(el){
   return document.createElement(el);
 }

 function append(parent, el) {
   return parent.appendChild(el);
 }

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
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

/**
 *  Add form
 */
  function getServerData(url,options) {
  return fetch(url,options).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}
    
   
  const formEl = document.getElementById("formcomment");
  //const submitBtn = document.querySelector('button');
  const urlsReviews = 'http://localhost:1337/reviews/';

// get favorite and unfavorite data
function getIsFavorite() {

   //favorite
    let isFavorite = false;


     let thumbUP = document.getElementById("thumb-up");
      let thumbDown = document.getElementById("thumb-down");

     const favoritelst = document.getElementsByName("favorite");
     
       
   
   
     var i;
     for (i = 0; i < favoritelst.length; i++) {
         if (favoritelst[i].checked) {
             //aRate = favoritelst[i].value;
         }
     }

     if (thumbUP.checked) {
       isFavorite = true;
     } 
     
          
     //const urlsReviews = 'http://localhost:1337/reviews/';
     const isFavoriteData = {
        "restaurant_id": Number(restaurantID),
        "is_favorite":isFavorite
     };
     return isFavoriteData;
 
  }

  function getData(){
     // get a reviewer name.
     const commentorName = document.getElementById("username").value;
     const aComment = document.querySelector("textarea").value;
    
   

     const starList = document.getElementsByName("star");
     
       
     let aRate =1;
   
     var i;
     for (i = 0; i < starList.length; i++) {
         if (starList[i].checked) {
             aRate = starList[i].value;
         }
     }
     
     //const urlsReviews = 'http://localhost:1337/reviews/';
     const formData = {
         "restaurant_id": Number(restaurantID),
         "name": commentorName,
         "rating": Number(aRate),
         "comments": aComment
     };
     return formData;
  }
    
  function postData() {
   
       let jsonData = getData();
        //console.log("New comment posted :", jsonData);
        //DBHelper.saveData(jsonData);
         
       
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(jsonData);
        let opts = {
          method: 'POST',
          mode: 'no-cors',
          cache: "no-cache",
          credentials: 'same-origin',
          headers: headers,
          body: body
        }; 
/*
    fetch(urlsReviews, opts)
        .then(res => res.json())
        .then(data =>  console.log("Data added to the server",data))
        .catch(error => console.log('Erro', error.message));
    */
    //getServerData(urlsReviews, opts)
    //DBHelper.serverPostGetPut(urlsReviews, opts)
    getServerData(urlsReviews, opts)
            .then(data =>  console.log("Reviews added to the server",data))
            .catch(error => console.log('Erro', error.message));

    document.forms["formcomment"].reset(); 
    
 } 
// Save favorites
//const btn = document.getElementById('save-favorite');
const btn = document.querySelector('input[type= "button"]');

function saveBtn() {
      
        //const urlsReviews = 'http://localhost:1337/restaurants/2'

       let jsonData = getIsFavorite();
        console.log("New comment posted :", jsonData);
        const urlsReviews = `http://localhost:1337/restaurants/${jsonData.restaurant_id}`;  
         
       
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(jsonData);
        let opts = {
          method: 'Put',
          mode: 'cors',
          cache: "no-cache",
          credentials: 'same-origin',
          headers: headers,
          body: body
        };
       // DBHelper.serverPostGetPut(urlsReviews, opts)
            getServerData(urlsReviews, opts)
            .then(data =>  console.log("Favorite added to the server",data))
            .catch(error => console.log('Erro', error.message));

}
// Add as favorite  restaurant to the server 
btn.addEventListener('click',function (event) {
    event.preventDefault();
    saveBtn();
  });


  // Add data to the server.
  formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    postData();
  });