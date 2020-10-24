const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//  Unsplash API
const count = 10;
const apiKey = 'lYs_grrLpCCD01ocnyY1J8SeDZH3h6HRXOjRMd9f9pw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to Set Attributes on DOM elements
function setAttributes(element,attributes) {
  for (const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item,{
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img,{
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
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