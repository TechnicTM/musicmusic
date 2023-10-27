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
// let volume_slider = document.querySelector('.volume_slider');
// let diraction_slider = document.querySelector('.diraction_slider');
let styleVol = document.querySelector('[data="vol"]');
let styleDir = document.querySelector('[data="dir"]');
let modal = document.getElementById("myModal");
let keyshort = document.getElementById("keyboardShort");
let proPicCont = document.getElementById("profilePicCont");
let proPic = document.querySelector('.profile-image');

let update_volume = 90;
let timer;
let colorChange;
let ieoc = false;
let autoplay = 0;
let toggleMute = 1;
let toggleMenu = 0;
let toggleKaraoke = 0;
let showK = 0;
let showP = 0;

let pl = 0;
let index_no = 0;
let Playing_song = false;

// document.addEventListener("contextmenu", (event) => {
//  event.preventDefault();
// });

//responsive side menu bar
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const sideNav = document.getElementById("sideNav");
const sideNavBg = document.getElementById("sideNavBg");
const nl = document.getElementById("navLink");
const nlc = document.querySelectorAll(".navLink");
const logo = document.getElementById("logoTxt");
menuBtn.addEventListener('click', function() {
  sideNav.style.display = "block";
  sideNavBg.style.display = "block";
  setTimeout(function () {
    sideNav.classList.add('show');
    sideNavBg.classList.add('show');
  }, 1);
})
closeMenuBtn.addEventListener('click', function() {
  sideNav.classList.remove('show');
  sideNavBg.classList.remove('show');
  setTimeout(function () {
    sideNav.style.display = "none";
    sideNavBg.style.display = "none";
  }, 500);
})
function closeBg() {
  sideNav.classList.remove('show');
  sideNavBg.classList.remove('show');
  setTimeout(function () {
    sideNav.style.display = "none";
    sideNavBg.style.display = "none";
  }, 500);
}
function changeLogo1() {
  resetAll();
  nlc[0].classList.add('active');
  logo.innerHTML = "Reggaton";
  pl = 0;
  index_no = 0;
  load_track(index_no);
}
function changeLogo2() {
  resetAll();
  nlc[1].classList.add('active');
  logo.innerHTML = "R&B";
  pl = 1;
  index_no = 0;
  load_track(index_no);
}
function changeLogo3() {
  resetAll();
  nlc[2].classList.add('active');
  logo.innerHTML = "Electronic/Dance";
  pl = 2;
  index_no = 0;
  load_track(index_no);
}
function changeLogo4() {
  resetAll();
  nlc[3].classList.add('active');
  logo.innerHTML = "Pop";
  pl = 3;
  index_no = 0;
  load_track(index_no);
}
function changeLogo5() {
  resetAll();
  nlc[4].classList.add('active');
  logo.innerHTML = "Afrobeats";
  pl = 4;
  index_no = 0;
  load_track(index_no);
}
function changeLogo6() {
  resetAll();
  nlc[5].classList.add('active');
  logo.innerHTML = "Hip-Hop/Rap";
  pl = 5;
  index_no = 0;
  load_track(index_no);
}

function resetAll() {
  for (let i = 0; i<nlc.length; i++) {
    nlc[i].classList.remove('active');
  }
  sideNav.classList.remove('show');
  sideNavBg.classList.remove('show');
  setTimeout(function () {
    sideNav.style.display = "none";
    sideNavBg.style.display = "none";
    modal.style.display = "none";
  }, 500);
  toggleKaraoke = 0;
  pausesong();
	reset_slider();
  track.src = All_song[pl][index_no].path;
  track.load();
  document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
  let time = Math.floor(track.currentTime);
  let minutes = Math.floor(time/60);
  let secends = time%60;
  secends = secends < 10 ? '0' + secends : secends;
  m.innerHTML = minutes;
  s.innerHTML = secends;
}

function changeUsername() {
  const inputString = localStorage.getItem('~username');
  const commaIndex = inputString.indexOf('~');
  const commaIndexT = inputString.indexOf('|');
  const getEmail = inputString.substring(0, commaIndex);
  const getProPic = inputString.substring(commaIndexT + 1);
  const inputString1 = localStorage.getItem(getEmail);
  const commaIndex1 = inputString1.indexOf('~');
  const getPassword = inputString1.substring(0, commaIndex1);
  let username = prompt("Enter new username:");
  if (username != null) {
    while (username.includes('|') || username.includes('~') || username == "") {
      alert("You must enter a valid username! (You can't use the '|' symbol or the '~' symbols in a username)");
      username = prompt("Enter new username:");
      if (username == null) {
        break;
      }
    }
  }
  if (username != null) {
    localStorage.setItem(getEmail, getPassword + "~" + username + "|" + getProPic);
    localStorage.setItem("~username", getEmail + "~" + username + "|" + getProPic);
    start();
  }
}

function start() {
  let count;
  if (localStorage.length == 0) {
    window.location.href = "https://technictm.github.io/musicmusicform/";
  }
  else {
    for (i = 0; i<localStorage.length; i++) {
      if (localStorage.key(i) == "~username") {
        if (localStorage.getItem("~username") == "~none") {
          window.location.href = "https://technictm.github.io/musicmusicform/";
        }
        // document.getElementById("usernametxt").innerHTML = "signed in as: " + localStorage.getItem('~username');
        const inputString = localStorage.getItem('~username');
        const commaIndex = inputString.indexOf('~');
        const commaIndexT = inputString.indexOf('|');
        const getEmail = inputString.substring(0, commaIndex);
        const getUsername = inputString.substring(commaIndex + 1, commaIndexT);
        const getProPic = inputString.substring(commaIndexT + 1);
        proPicCeck(getProPic);
        document.getElementById("profile-title").innerHTML = getUsername + '<br><span>' + getEmail + '</span>';
        break;
      }
      else {
        count = Number(i);
      }
      count+=1;
      if (count == localStorage.length) {
        window.location.href = "https://technictm.github.io/musicmusicform/";
      }
    }
  }
}

function profileToggle() {
  document.querySelector('.profile-menu').classList.toggle('active');
}

function proPicCeck(proPicInd) {
  const inputString = localStorage.getItem('~username');
  const commaIndex = inputString.indexOf('~');
  const commaIndexT = inputString.indexOf('|');
  const getEmail = inputString.substring(0, commaIndex);
  const getUsername = inputString.substring(commaIndex + 1, commaIndexT);
  const inputString1 = localStorage.getItem(getEmail);
  const commaIndex1 = inputString1.indexOf('~');
  const getPassword = inputString1.substring(0, commaIndex1);
  localStorage.setItem(getEmail, getPassword + "~" + getUsername + "|" + String(proPicInd));
  localStorage.setItem("~username", getEmail + "~" + getUsername + "|" + String(proPicInd));
  proPic.src = "img/avatar" + String(proPicInd) + ".png";
}

function clsProPic() {
  if (showP == 1) {
    proPicCont.classList.remove('show');
    setTimeout(function () {
      proPicCont.style.display = "none";
    }, 150);
    showP = 0;
  }
  else {
    proPicCont.style.display = "block";
    setTimeout(function () {
      proPicCont.classList.add('show');
    }, 1);
    showP = 1;
  }
}

function logout() {
  localStorage.setItem("~username", "~none");
  window.location.href = "https://technictm.github.io/musicmusicform/";
}

// close modal when click on the background \\
/*window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}*/

//create an audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
  // Reggaton
   [{
     name: "Loco Contigo",
     path: "songs/LocoContigo.mp3",
     img: "img/LocoContigo.jpeg",
     bgimg: "img/LocoContigoBg.jpeg",
     singer: "DJ Snake, J Balvin, Tyga",
     songtime: "3:09",
     karaoke: "songs/LocoContigoK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/djsnake/lococontigo.html"
   },
   {
     name: "China",
     path: "songs/China.mp3",
     img: "img/china.jpeg",
     bgimg: "img/chinabg.webp",
     singer: "Anuel AA, Daddy Yankee, Karol G, Ozuna, J Balvin",
     songtime: "5:02",
     karaoke: "songs/ChinaK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/anuelaa/china.html"
   },
   {
     name: "Pepas",
     path: "songs/Pepas.mp3",
     img: "img/pepas.jpeg",
     bgimg: "img/pepasbg.jpeg",
     singer: "Farruko",
     songtime: "4:47",
     karaoke: "songs/PepasK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/farruko/pepas.html"
   },
   {
     name: "No Lo Trates",
     path: "songs/NoLoTrates.mp3",
     img: "img/NoLoTrates.jpeg",
     bgimg: "img/NoLoTratesBg.jpeg",
     singer: "Pitbull, Daddy Yankee, Natti Natasha",
     songtime: "3:29",
     karaoke: "songs/NoLoTratesK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/pitbull/nolotrates.html"
   },
   {
     name: "No Se Da Cuenta",
     path: "songs/NoSeDaCuenta.mp3",
     img: "img/NoSeDaCuenta.jpeg",
     bgimg: "img/NoSeDaCuentaBg.jpeg",
     singer: "Ozuna, Daddy Yankee",
     songtime: "4:02",
     karaoke: "songs/NoSeDaCuentaK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/nosedacuenta.html"
   },
   {
     name: "Una Locura",
     path: "songs/UnaLocura.mp3",
     img: "img/UnaLocura.jpeg",
     bgimg: "img/UnaLocuraBg.jpeg",
     singer: "Ozuna, J Balvin, Chencho Corleone",
     songtime: "3:52",
     karaoke: "songs/UnaLocuraK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/unalocura.html"
   }],

   // R&B
   [{
    name: "Dynamite",
    path: "songs/Dynamite.mp3",
    img: "img/Dynamite.jpeg",
    bgimg: "img/DynamiteBg.jpeg",
    singer: "Taio Cruz",
    songtime: "4:16",
    karaoke: "songs/DynamiteK.mp3",
    lyrics: "https://www.azlyrics.com/lyrics/taiocruz/dynamite.html"
   },
   {
     name: "Soweto",
     path: "songs/Soweto.mp3",
     img: "img/Soweto.jpeg",
     bgimg: "img/Sowetobg.webp",
     singer: "Victony, Tempoe",
     songtime: "?:??",
     karaoke: "songs/SowetoK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/victony/soweto.html"
   },
   {
     name: "Mood",
     path: "songs/Mood.mp3",
     img: "img/Mood.jpeg",
     bgimg: "img/Moodbg.jpeg",
     singer: "24kGoldn",
     songtime: "?:??",
     karaoke: "songs/MoodK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/24kgoldn/mood.html"
   }/*,
   {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],

   // Electronic/Dance
   [{
    name: "Alone",
    path: "songs/Alone.mp3",
    img: "img/Alone.jpeg",
    bgimg: "img/AloneBg.jpeg",
    singer: "Marshmello",
    songtime: "?:??"
  },
  {
    name: "Levels",
    path: "songs/Levels.mp3",
    img: "img/Levels.jpeg",
    bgimg: "img/Levelsbg.webp",
    singer: "Avichi",
    songtime: "?:??"
  },
  {
    name: "Peru",
    path: "songs/Peru.mp3",
    img: "img/Peru.jpeg",
    bgimg: "img/Perubg.jpeg",
    singer: "Fireboy DML, Ed Sheeran",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],

  // Pop
  [{
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.webp",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],

  // Afrobeats
  [{
    name: "Commando",
    path: "songs/Commando.mp3",
    img: "img/Commando.jpeg",
    bgimg: "img/CommandoBg.jpeg",
    singer: "Mavokali",
    songtime: "?:??"
  },
  {
    name: "Calm Down",
    path: "songs/CalmDown.mp3",
    img: "img/CalmDown.jpeg",
    bgimg: "img/CalmDownBg.jpeg",
    singer: "Rema",
    songtime: "?:??"
  },
  {
    name: "KU LO SA",
    path: "songs/KULOSA.mp3",
    img: "img/KULOSA.jpeg",
    bgimg: "img/KULOSABg.jpeg",
    singer: "Oxlade, Camila Cabello",
    songtime: "?:??"
  },
  {
    name: "Am I Wrong",
    path: "songs/AmIWrong.mp3",
    img: "img/AmIWrong.jpeg",
    bgimg: "img/AmIWrongBg.jpeg",
    singer: "Nico, Vinz",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],
  
  // Hip-Hop/Rap
  [{
    name: "Up Down",
    path: "songs/UpDown.mp3",
    img: "img/UpDown.jpeg",
    bgimg: "img/UpDownBg.jpeg",
    singer: "T-Pain",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.webp",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/]
];


// All functions

window.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'k'){
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
  if (event.shiftKey && event.key === 'M'){
    event.preventDefault();
    if (toggleMenu == 0) {
      sideNav.style.display = "block";
      sideNavBg.style.display = "block";
      setTimeout(function () {
        sideNav.classList.add('show');
        sideNavBg.classList.add('show');
      }, 1);
      toggleMenu = 1;
    }
    else {
      sideNav.classList.remove('show');
      sideNavBg.classList.remove('show');
      setTimeout(function () {
        sideNav.style.display = "none";
        sideNavBg.style.display = "none";
      }, 500);
      toggleMenu = 0;
    }
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'a'){
    event.preventDefault();
    autoplay_switch();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'd'){
    event.preventDefault();
    karaoke_toggle();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 's'){
    event.preventDefault();
    lyrics_toggle();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === '='){
    event.preventDefault();
    recent_volume.value = Number(recent_volume.value) + 5;
    volume_change();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === '-'){
    event.preventDefault();
    recent_volume.value -= 5;
    volume_change();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'l'){
    event.preventDefault();
    track.currentTime += 10;
    position = track.currentTime * (100 / track.duration);
		slider.value =  position;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'j'){
    event.preventDefault();
    track.currentTime -= 10;
    position = track.currentTime * (100 / track.duration);
		slider.value =  position;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'n'){
    event.preventDefault();
    next_song();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'p'){
    event.preventDefault();
    previous_song();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === '0'){
    event.preventDefault();
    reset_slider();
    track.currentTime = 0;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
});

const changeColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  document.documentElement.style.setProperty('--defaultcolor', `rgb(${red}, ${green}, ${blue})`);
}
window.addEventListener('keydown', (event) => {
  if (event.shiftKey && event.key === 'C'){
    if (ieoc == false) {
      colorChange = setInterval(changeColor, 250);
      ieoc = true;
    }
    else {
      clearInterval(colorChange);
      document.documentElement.style.setProperty('--defaultcolor', '#FF8A65');
      ieoc = false;
    }
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.shiftKey && event.key === '?'){
    event.preventDefault();
    clsKeyShort();
  }
});

function clsKeyShort() {
  if (showK == 1) {
    keyshort.classList.remove('show');
    setTimeout(function () {
      keyshort.style.display = "none";
    }, 150);
    showK = 0;
  }
  else {
    keyshort.style.display = "block";
    setTimeout(function () {
      keyshort.classList.add('show');
    }, 1);
    showK = 1;
  }
}

/*function isterEggOne() {
  colorChange = setInterval(changeColor, 250);
  setTimeout(function () {
    clearInterval(colorChange);
    document.documentElement.style.setProperty('--defaultcolor', '#FF8A65');
  }, 60000);
}*/

/*window.addEventListener('keydown', (event) => {
  if (event.key === 'c'){
    window.addEventListener('keydown', (event) => {
      if (event.key === 'o'){
        window.addEventListener('keydown', (event) => {
          if (event.key === 'l'){
            window.addEventListener('keydown', (event) => {
              if (event.key === 'o'){
                window.addEventListener('keydown', (event) => {
                  if (event.key === 'r'){
                    if (ieoc == false) {
                      colorChange = setInterval(changeColor, 250);
                      ieoc = true;
                      console.log("ieoc = " + ieoc);
                    }
                    else {
                      clearInterval(colorChange);
                      document.documentElement.style.setProperty('--defaultcolor', '#FF8A65');
                      ieoc = false;
                      console.log("ieoc = " + ieoc);
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});*/

// function load the track
function load_track(index_no){
  clearInterval(timer);
	reset_slider();

	track.src = All_song[pl][index_no].path;
	title.innerHTML = All_song[pl][index_no].name;
	titlere.innerHTML = All_song[pl][index_no].name;	
	track_image.src = All_song[pl][index_no].img;
	track_image_under.src = All_song[pl][index_no].img;
	track_image_bg.src = All_song[pl][index_no].bgimg;
  artist.innerHTML = All_song[pl][index_no].singer;
  artistre.innerHTML = All_song[pl][index_no].singer;
  totalTime.innerHTML = All_song[pl][index_no].songtime;
  track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song[pl].length;
	present.innerHTML = index_no + 1;
  document.title = All_song[pl][index_no].name + " - " + All_song[pl][index_no].singer;
}

load_track(index_no);

function karaoke_toggle() {
  // turn off
  if (toggleKaraoke == 1){
    toggleKaraoke = 0;
	  reset_slider();
    track.src = All_song[pl][index_no].path;
    track.load();
    pausesong();
    document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
  // turn on
  else{
    toggleKaraoke = 1;
    reset_slider();
    track.src = All_song[pl][index_no].karaoke;
    track.load();
    pausesong();
    document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
}

function lyrics_toggle() {
  window.open(All_song[pl][index_no].lyrics, "_blank");
}

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
	if(index_no < All_song[pl].length - 1){
		index_no += 1;
		load_track(index_no);
	}
  else{
		index_no = 0;
		load_track(index_no);
	}
  toggleKaraoke = 0;
	reset_slider();
  track.src = All_song[pl][index_no].path;
  track.load();
  document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
  let time = Math.floor(track.currentTime);
  let minutes = Math.floor(time/60);
  let secends = time%60;
  secends = secends < 10 ? '0' + secends : secends;
  m.innerHTML = minutes;
  s.innerHTML = secends;
  playsong();
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
	}
  else{
		index_no = All_song[pl].length - 1;
		load_track(index_no);
	}
  toggleKaraoke = 0;
	reset_slider();
  track.src = All_song[pl][index_no].path;
  track.load();
  document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
  let time = Math.floor(track.currentTime);
  let minutes = Math.floor(time/60);
  let secends = time%60;
  secends = secends < 10 ? '0' + secends : secends;
  m.innerHTML = minutes;
  s.innerHTML = secends;
  playsong();
}

function nextTitleShow(x) {
  let i;
  if(index_no < All_song[pl].length - 1) {
    i = index_no + 1;
  }
  else {
    i = 0;
  }
  x.title = All_song[pl][i].name + " - " + All_song[pl][i].singer;
}

function previousTitleShow(x) {
  let i;
  if(index_no > 0){
		i = index_no - 1;
	}
  else{
		i = All_song[pl].length - 1;
	}
  x.title = All_song[pl][i].name + " - " + All_song[pl][i].singer;
}

function playPauseTitle(x) {
  if (Playing_song) {
    x.title = "Pause";
  }
  else {
    x.title = "Play";
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
}

// change slider position 
function change_duration(){
	  slider_position = track.duration * (slider.value / 100);
	  track.currentTime = slider_position;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
}


// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "var(--defaultcolor)";
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
          if(index_no < All_song[pl].length - 1) {
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
