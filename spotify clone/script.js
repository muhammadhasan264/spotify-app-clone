console.log('welcome')

let songIndex = 0;
let audioElement = new Audio('./musics/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogress');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));


let songs = [
    {songName: "Tum mere 2", filePath: "./musics/1.mp3", coverPath: "./images/cover1.jpg"},
    {songName: "Aaoge tum kbhi - The local train", filePath: "./musics/2.mp3", coverPath: "./images/cover2.jpg"},
    {songName: "Choo lo - The local train", filePath: "./musics/3.mp3", coverPath: "./images/cover2.jpg"},
    {songName: "Tauba Tauba - Karan Aujla", filePath: "./musics/4.mp3", coverPath: "./images/cover4.jpg"},
    {songName: "BlockBuster - CokeStudio", filePath: "./musics/5.mp3", coverPath: "./images/cover5.jpg"},
    {songName: "Pehli si Muhabbat - Ali Zafar", filePath: "./musics/6.mp3", coverPath: "./images/cover6.jpg"},
    {songName: "Baarish - Yaariyan", filePath: "./musics/7.mp3", coverPath: "./images/cover7.jpg"},
    {songName: "Banjaara - Ek Villian", filePath: "./musics/8.mp3", coverPath: "./images/cover8.jpg"},
]

songitems.forEach((element, i)=>{
    console.log(element, i);
     element.getElementsByTagName('img')[0].src = songs[i].coverPath;
     element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
})

// handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity= 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity= 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', ()=> {
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})


myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./musics/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})