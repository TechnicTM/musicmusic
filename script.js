let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let artist = document.querySelector('#artist');
let titlere = document.querySelector('#titlere');
let artistre = document.querySelector('#artistre');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let track_image_under = document.querySelector('#track_image_under');
let track_image_bg = document.querySelector('#track_image_bg');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let m = document.querySelector('#m');
let s = document.querySelector('#s');
let totalTime = document.querySelector('#totalTime');
let volume_icon = document.querySelector('#volume_icon');
let volume_slider = document.querySelector('.volume_slider');
let diraction_slider = document.querySelector('.diraction_slider');
let styleVol = document.querySelector('[data="vol"]');
let styleDir = document.querySelector('[data="dir"]');

let update_volume = 90;
let timer;
let autoplay = 0;
let toggleMute = 1;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "Loco Contigo",
     path: "songs/LocoContigo.mp3",
     img: "img/LocoContigo.jpeg",
     bgimg: "img/LocoContigoBg.jpeg",
     singer: "DJ Snake, J Balvin, Tyga",
     songtime: "3:09"
   },
   {
     name: "China",
     path: "songs/China.mp3",
     img: "img/china.jpeg",
     bgimg: "img/chinabg.webp",
     singer: "Anuel AA, Daddy Yankee, Karol G, Ozuna, J Balvin",
     songtime: "5:02"
   },
   {
     name: "Pepas",
     path: "songs/Pepas.mp3",
     img: "img/pepas.jpeg",
     bgimg: "img/pepasbg.jpeg",
     singer: "Farruko",
     songtime: "4:47"
   },
   {
     name: "No Lo Trates",
     path: "songs/NoLoTrates.mp3",
     img: "img/NoLoTrates.jpeg",
     bgimg: "img/NoLoTratesBg.jpeg",
     singer: "Pitbull, Daddy Yankee, Natti Natasha",
     songtime: "3:29"
   },
   {
     name: "No Se Da Cuenta",
     path: "songs/NoSeDaCuenta.mp3",
     img: "img/NoSeDaCuenta.jpeg",
     bgimg: "img/NoSeDaCuentaBg.jpeg",
     singer: "Ozuna, Daddy Yankee",
     songtime: "4:02"
   },
   {
     name: "Una Locura",
     path: "songs/UnaLocura.mp3",
     img: "img/UnaLocura.jpeg",
     bgimg: "img/UnaLocuraBg.jpeg",
     singer: "Ozuna, J Balvin, Chencho Corleone",
     songtime: "3:52"
   }
];


// All functions

window.addEventListener('keydown', (event) => {
  if (event.key === ' '){
    event.preventDefault();
    justplay();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'm'){
    event.preventDefault();
    toggle_mute();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'a'){
    event.preventDefault();
    autoplay_switch();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.shiftKey && event.key === '>'){
    event.preventDefault();
    track.currentTime += 10;
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.shiftKey && event.key === '<'){
    event.preventDefault();
    track.currentTime -= 10;
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.ctrlKey && event.key === '.'){
    event.preventDefault();
    next_song();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.ctrlKey && event.key === ','){
    event.preventDefault();
    previous_song();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.shiftKey && event.key === '?'){
    event.preventDefault();
    show_keys();
  }
});

// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	titlere.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
	track_image_under.src = All_song[index_no].img;
	track_image_bg.src = All_song[index_no].bgimg;
    artist.innerHTML = All_song[index_no].singer;
    artistre.innerHTML = All_song[index_no].singer;
    totalTime.innerHTML = All_song[index_no].songtime;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);

// toggle mute function
function toggle_mute(){
	if (toggleMute==1){
      toggleMute = 0;
      mute_sound();
	}else{
      toggleMute = 1;
      on_sound();
	}
}

//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
  volume_icon.classList.remove("fa-volume-down");
  volume_icon.classList.remove("fa-volume-up");
  volume_icon.classList.remove("fa-volume-off");
  volume_icon.classList.add("fa-volume-xmark");
}

//on sound function
function on_sound(){
	track.volume = update_volume/100;
	volume.value = update_volume;
	volume_show.innerHTML = update_volume;
  if (recent_volume.value >= 50){
    volume_icon.classList.remove("fa-volume-xmark");
    volume_icon.classList.remove("fa-volume-down");
    volume_icon.classList.remove("fa-volume-off");
    volume_icon.classList.add("fa-volume-up");
  }
  
  if (recent_volume.value < 50){
    volume_icon.classList.remove("fa-volume-xmark");
    volume_icon.classList.add("fa-volume-down");
    volume_icon.classList.remove("fa-volume-off");
    volume_icon.classList.remove("fa-volume-up");
  }
  
  if (recent_volume.value == 0){
    volume_icon.classList.remove("fa-volume-xmark");
    volume_icon.classList.remove("fa-volume-down");
    volume_icon.classList.add("fa-volume-off");
    volume_icon.classList.remove("fa-volume-up");
  }
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
  update_volume = recent_volume.value;

  if (recent_volume.value >= 50){
    volume_icon.classList.remove("fa-volume-xmark");
    volume_icon.classList.remove("fa-volume-down");
    volume_icon.classList.remove("fa-volume-off");
    volume_icon.classList.add("fa-volume-up");
  }
  
  if (recent_volume.value < 50){
    volume_icon.classList.remove("fa-volume-xmark");
    volume_icon.classList.add("fa-volume-down");
    volume_icon.classList.remove("fa-volume-off");
    volume_icon.classList.remove("fa-volume-up");
  }
  
  if (recent_volume.value == 0){
    volume_icon.classList.remove("fa-volume-xmark");
    volume_icon.classList.remove("fa-volume-down");
    volume_icon.classList.add("fa-volume-off");
    volume_icon.classList.remove("fa-volume-up");
  }

  if(volume.value > 50){
    /*volume_slider.style.background = "#FF8A65";*/
    styleVol.innerHTML = ".volume_slider::-webkit-slider-thumb { background: #FF8A65; }";
  }
  else{
    /*volume_slider.style.background = "transparent";*/
    styleVol.innerHTML = ".volume_slider::-webkit-slider-thumb { background: transparent; }";
  }
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;

  if(slider.value > 50){
    /*diraction_slider.style.background = "#FF8A65";*/
    styleDir.innerHTML = ".diraction_slider::-webkit-slider-thumb { background: #FF8A65; }";
  }
  else{
    /*diraction_slider.style.background = "transparent";*/
    styleDir.innerHTML = ".diraction_slider::-webkit-slider-thumb { background: transparent; }";
  }
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

        if(!isNaN(track.duration)){
          let time = Math.floor(track.currentTime);
          let minutes = Math.floor(time/60);
          let secends = time%60;
          secends = secends < 10 ? '0' + secends : secends;
          m.innerHTML = minutes;
          s.innerHTML = secends;
        }
       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
            if(index_no < All_song.length - 1) {
              index_no += 1;
		          load_track(index_no);
		          playsong();
            }
            else {
              index_no = 0;
              load_track(index_no);
		          playsong();
            }
           }
	    }
     }