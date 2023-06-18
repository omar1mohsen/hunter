import * as model from '../model.js'
let animeName = decodeURIComponent(location.search.substring(1)).split('/')
let BegingID;
// let fetch our data and the distrabute on our fuc
export const getDate = async (api,parentEl,EpiosdesEl,videoEl)=>{
    try{
        const res = await fetch(api+"Name=" + encodeURIComponent(animeName[0]))
        const data = await res.json() 
        if(!res.ok){throw new Error(`${data.massage} ${res.status}`);}
        let displayData = data[0];
        renderDisplayDec(displayData,parentEl)
        renderDisplayEpiosdesAndVideo(api,EpiosdesEl,videoEl)

    }catch{
        model.creatError()
    }
}

// this for bulid our data body
const renderDisplayDec = (displayData,parentEl,)=>{
    const markup = `
    <div class="col-md-6 right-side py-3 d-flex justify-content-center">
    <img src="${displayData.Image}" class="img-fluid rounded-3" alt="">
    </div><!-- right-side -->
    <div class="col-md-6 left-side d-flex flex-column justify-content-center">
    <h3>${displayData.Name}</h3>
    <h3>${displayData.Releases}</h3>
    <h3>Studio : ${displayData.Studio}</h3>
    <p class="px-5">${displayData.Description}</p>
    </div><!-- left-side -->
    `
    parentEl.insertAdjacentHTML("afterbegin",markup)
}

const renderDisplayEpiosdesAndVideo = async (api,EpiosdesEl,videoEl)=>{
    const res = await fetch(api + "Name=" + encodeURIComponent(animeName[0]) + `&status=list`)
    const data = await res.json() 
    if(!res.ok){throw new Error(`${data.massage} ${res.status}`);}
    BegingID = data[0].ID
    data.reverse().map(epiosde=>{
        const epiosdeBody = `
        <div class="col-3 p-2 w-auto  episode overflow-hidden ">
               <a class="link bg-danger" id="videEpisode"  data-id=${epiosde.ID}>episode ${epiosde.Episode}</a> 
            </div><!--episode  -->
        `
        EpiosdesEl.insertAdjacentHTML("afterbegin",epiosdeBody)
    })
   videoCheck(api,videoEl,BegingID)
    
}
const videoCheck = (api,videoEl,BegingID)=>{
    let videEpisodes = document.querySelectorAll("#videEpisode")
    videEpisodes[0].classList.add("active")
    renderDisplayVideo(api,videoEl,BegingID)
    for(let i = 0 ; i< videEpisodes.length;i++){
        videEpisodes[i].addEventListener("click",()=>{
            videoEl.innerHTML=""
            videEpisodes[i].classList.add("active")
            BegingID = videEpisodes[i].getAttribute("data-id")
            renderDisplayVideo(api,videoEl,BegingID)
        })
    }
}

const renderDisplayVideo = async (api,videoEl,BegingID)=>{
        const res = await fetch(api +" episode=" + BegingID )
        const data = await res.json() 
        if(!res.ok){throw new Error(`${data.massage} ${res.status}`);}
        let videoQuality = data[data.length - 1] ;
        const markup = `
        <div class="video-background"></div>
        <video src="${videoQuality.Link}" class="w-100" controls ></video>
        <div class="play" ><i class="fa-solid fa-circle-play"></i></div>
        `
        videoEl.insertAdjacentHTML("afterbegin",markup)
    // lets put a loader for video 
    let video = document.querySelector("video")
        video.ondurationchange  = ()=>{
            document.querySelector(".loader-box").style.display = "flex"
            setTimeout(()=>{
                document.querySelector(".loader-box").style.display = "none"
            },1000)
        }
    // play btn control
    let playBtn =  document.querySelector(".display-video .play")
    playBtn.addEventListener("click",()=>{
    document.querySelector(".display-video .video-background").style.display = "none"
    playBtn.style.display = "none"
    document.querySelector(".display-video video").play()
})

}

