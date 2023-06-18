import * as model from './model.js'

// doc Elements
let ApiForRandomData = "https://api.iwannawatch.cf/garson.php?random=data"
let topContanier = document.querySelector(".top-category .anime-contaniner")
let recentlyContanier = document.querySelector(".recently-category .anime-contaniner")
let mostViewedyContanier = document.querySelector(".most-viewed-category .anime-contaniner")
let leftArrows = Array.from(document.querySelectorAll(".left-arrow")) 
let rightArrows = Array.from(document.querySelectorAll(".right-arrow")) 
let animeContaniers = Array.from(document.querySelectorAll(".anime-contaniner")) 
// let recentEpisodes = document.querySelector(".recent-episodes .anime-contaniner")
// we gonna handel the user interface here


   model.showData(ApiForRandomData,topContanier)
   model.showData(ApiForRandomData,recentlyContanier)
   model.showData(ApiForRandomData,mostViewedyContanier)



//right-btn
for (let i = 0; i < rightArrows.length; i++) {
   rightArrows[i].addEventListener('click', function() {
     for(let j = 0; j <= animeContaniers.length; j++){
      if(i === j){
         animeContaniers[j].scrollLeft += (animeContaniers[j].clientWidth )
      }
     }
   }.bind(this, i));
}
//left-btn
for (let i = 0; i < leftArrows.length; i++) {
   leftArrows[i].addEventListener('click', function() {
     for(let j = 0; j <= animeContaniers.length; j++){
      if(i === j){
         animeContaniers[j].scrollLeft -= (animeContaniers[j].clientWidth)
      }
     }
   }.bind(this, i));
}


// search sec 
let search = document.querySelector(".search .form-control")
let searchBtn = document.querySelector(".search-btn")
let searchContanier = document.querySelector(".search-results .anime-contaniner")
let clearSearchBtn = document.querySelector(".clear-search")
let searchArrows = document.querySelector(".search-results .arrows")
let upArrow = document.querySelector(".fa-circle-chevron-up")
let downArrow = document.querySelector(".fa-circle-chevron-down")

// when press search we gonna call get data func from model
const getDate = async ()=>{
   model.showData(`https://api.iwannawatch.cf/garson.php?search=${search.value}`,searchContanier)
   searchArrows.style.display = "flex"
}
// to clear search input
const clearSearch = ()=>{
   search.value = ""
   searchContanier.innerHTML = ""
   clearSearchBtn.style.display = "none"
   searchArrows.style.display = "none"
}
// to control in search results
upArrow.addEventListener("click",()=>{
   searchContanier.scrollTop -= searchContanier.clientHeight
})
downArrow.addEventListener("click",()=>{
   searchContanier.scrollTop += searchContanier.clientHeight
})

// our buttons
searchBtn.onclick = getDate
clearSearchBtn.onclick = clearSearch

//onload
let preloadPage = document.querySelector(".render-page")
window.onload = ()=>{
   let preloadTiltle = document.querySelector(".render-page-title")
   const pageLoad = setInterval(()=>{
      if(preloadTiltle.style.width = "100%"){
         preloadPage.style.display = "none"
         clearInterval(pageLoad)
      }
     
   },1000)

}

//
let mainBookmarkBtn = document.querySelector(".nav-compontes .Bookmark")
mainBookmarkBtn.addEventListener("click",()=>{
   model.renderBookMarks()
})

// scroll up btn 
const scrollHandler = ()=>{
   let scroller = document.querySelector(".scroll-btn")
   window.onscroll = function(){
       if(this.scrollY >= 110){
         scroller.style.opacity = 1
         console.log(scroller.style.display)
       }else{
         scroller.style.opacity = 0
       }
   }
   //start spaceShip
   document.querySelector(".scroll-btn").onclick = ()=>{
       window.scrollTo({
           top:0,
           behavior:"smooth",
       });
   }
}

scrollHandler()