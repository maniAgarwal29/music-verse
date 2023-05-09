console.log("Welcome to MusicVerse");

//Variables
let songIndex=1;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Attention", filePath: "1.mp3", coverPath: "cover1.png"},
    {songName: "Charlie Be Quiet", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Light Switch", filePath: "3.mp3", coverPath: "3.jpeg"},
    {songName: "We Don't Talk Anymore", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "The Way I Am", filePath: "5.mp3", coverPath: "5.jpg"},
]

songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i]
.songName});


//Play/Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})


//Events
audioElement.addEventListener('timeupdate', ()=>{
   console.log('timeupdate');
   //Seekbar updation
   progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
   console.log(progress);
   myProgressBar.value= progress;
});

//For seeking at any time
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});

let makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[songIndex-1].filePath; // use the filePath property of selected song
        masterSongName.innerText = songs[songIndex-1].songName; // update song name
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex=1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src=songs[songIndex-1].filePath; // use the filePath property of selected song
    masterSongName.innerText = songs[songIndex-1].songName; // update song name
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){ // change condition to 1
        songIndex=1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=songs[songIndex-1].filePath; // use the filePath property of selected song
    masterSongName.innerText = songs[songIndex-1].songName; // update song name
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
});
