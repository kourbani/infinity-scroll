const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// const errorMessage = document.getElementById('no-images');

let readyToLoadImages = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// let errorCounter = 0;

//  Unsplash API
const fetchedImagesCount = 10;
const apiKey = 'lYs_grrLpCCD01ocnyY1J8SeDZH3h6HRXOjRMd9f9pw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${fetchedImagesCount}`;

// Check if all images loaded
function imageLoadedCheck(){
  imagesLoaded++;
  if(imagesLoaded === totalImages) {
    readyToLoadImages = true;
    loader.hidden = true;
  }
}

// Helper function to Set Attributes on DOM elements
function setAttributes(element,attributes) {
  for (const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}

// function showUnableToGetImagesMessage() {
//   if (!loader.hidden) {
//     loader.hidden = true;
//     errorMessage.hidden = false;
//   }
// }

// Create Elements for links and photos, Add to DOM
function displayImages() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

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
    img.addEventListener('load',imageLoadedCheck);
    // Put <img> inside <a>, then both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//  Get Photos from Unsplash API
async function getImages() {
  
  try {
    // errorMessage.hidden = true;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // throw new Error('oops');
    displayImages();
  } catch (error) {
    // errorCounter++;
    // if(errorCounter<10){
    //   getImages();
    // } else {
    //   showUnableToGetImagesMessage();
    // }   
  }
}

// Check if scroll is near bottom
window.addEventListener('scroll',() => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoadImages) {
    readyToLoadImages = false;
    getImages();
  }
});

// On load
getImages();