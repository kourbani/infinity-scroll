const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//  Unsplash API
const count = 10;
const apiKey = 'lYs_grrLpCCD01ocnyY1J8SeDZH3h6HRXOjRMd9f9pw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // Create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt',photo.alt_description);
    img.setAttribute('title',photo.alt_description);
    // Put <img> inside <a>, then both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//  Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    
  }
}

// On load
getPhotos();