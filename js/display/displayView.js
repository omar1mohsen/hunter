import * as displaymodel from './displayModel.js'
//we gonna get the anime name from url but lets check the back name if it has a strang symbols like ($%)

let EpiosdesEl = document.querySelector(".episodes")
let displayDec = document.querySelector(".display-dec")
let videoEl = document.querySelector(".anime-video .display-video")


//let preload the page as the main page
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
// let render our data
displaymodel.getDate("https://api.iwannawatch.cf/garson.php?",displayDec,EpiosdesEl,videoEl)


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