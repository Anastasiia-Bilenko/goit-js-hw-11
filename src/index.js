import { fetchImages } from './img';
import Notiflix from 'notiflix';
//selecters 
formEl = document.querySelector(".search-form")
inputEl = document.querySelector('input[name="searchQuery"]');
buttonEl = document.querySelector('button[type="submit"]');
divGalleryEl = document.querySelector(".gallery");
loadMoreButt = document.querySelector(".load-more")

console.log(divGalleryEl)

formEl.addEventListener("submit", addElementsToHtml)
loadMoreButt.addEventListener("click", nextPage)

let currentQuery = ''
let searchQuery = '';  
let page = 0
loadMoreButt.style.display = "none" 


function addElementsToHtml(evt){
evt.preventDefault()
divGalleryEl.innerHTML = ""
page = 1
searchQuery = evt.currentTarget[0].value;
currentQuery = inputEl.value

fetchImages(searchQuery)
.then((data => {
    if(data.totalHits === 0){
  loadMoreButt.style.display = "none"  
  Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."') 
    }else{
Notiflix.Notify.success(`"Hooray! We found ${data.totalHits} images."`)      
divGalleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits))
console.log(data.hits)
loadMoreButt.style.display = "block" 
console.log(data.totalHits)        
    }
}))
}  


function nextPage(evt){
page += 1 ;
fetchImages(searchQuery, page)
.then((data => {
console.dir(data)
divGalleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits))
console.log(data)
loadMoreButt.style.display = "block"   
let math = Math.round(data.totalHits / 40)
if(page >= math){
loadMoreButt.style.display = "none"  
Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
}
}))
}



function createMarkup(arr) {
   return arr.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads,}) => 
    `<div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`
      )
      .join('');
  }



  