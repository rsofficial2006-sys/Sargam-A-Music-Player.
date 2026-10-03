const songs = [

    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        image: "https://picsum.photos/500?random=31",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        image: "https://picsum.photos/500?random=32",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        title: "Perfect",
        artist: "Ed Sheeran",
        image: "https://picsum.photos/500?random=33",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        title: "Kesariya",
        artist: "Arijit Singh",
        image: "https://picsum.photos/500?random=34",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },

    {
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        image: "https://picsum.photos/500?random=35",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },

    {
        title: "Stay",
        artist: "Justin Bieber",
        image: "https://picsum.photos/500?random=36",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },

    {
        title: "Starboy",
        artist: "The Weeknd",
        image: "https://picsum.photos/500?random=37",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },

    {
        title: "Hawayein",
        artist: "Arijit Singh",
        image: "https://picsum.photos/500?random=38",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },

    {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        image: "https://picsum.photos/500?random=39",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },

    {
        title: "Levitating",
        artist: "Dua Lipa",
        image: "https://picsum.photos/500?random=40",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    }

];


const audio = document.getElementById("audio");

const songGrid = document.getElementById("songGrid");

const playBtn = document.getElementById("playBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const playerTitle = document.getElementById("playerTitle");

const playerArtist = document.getElementById("playerArtist");

const playerImage = document.getElementById("playerImage");

const likeBtn = document.getElementById("likeBtn");

const searchInput = document.getElementById("searchInput");

let currentSong = 0;

let isPlaying = false;

let liked = false;


/* CREATE SONG CARDS */

function displaySongs(songArray = songs) {

    songGrid.innerHTML = "";

    songArray.forEach((song, index) => {

        const realIndex = songs.indexOf(song);

        const card = document.createElement("div");

        card.classList.add("song-card");

        card.innerHTML = `

            <img src="${song.image}" alt="${song.title}">

            <button class="card-play">
                <i class="fa-solid fa-play"></i>
            </button>

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

        `;

        card.addEventListener("click", () => {
            playSong(realIndex);
        });

        songGrid.appendChild(card);

    });
}


displaySongs();


/* PLAY SONG */

function playSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.audio;

    playerTitle.textContent = song.title;

    playerArtist.textContent = song.artist;

    playerImage.src = song.image;

    audio.play();

    isPlaying = true;

    updatePlayButton();

}


/* PLAY / PAUSE */

playBtn.addEventListener("click", () => {

    if (!audio.src) {

        playSong(0);

        return;
    }

    if (isPlaying) {

        audio.pause();

        isPlaying = false;

    } else {

        audio.play();

        isPlaying = true;
    }

    updatePlayButton();

});


function updatePlayButton() {

    if (isPlaying) {

        playBtn.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    } else {

        playBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';
    }
}


/* NEXT */

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);

});


/* PREVIOUS */

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    playSong(currentSong);

});


/* AUTO NEXT */

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);

});


/* PROGRESS */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}


/* VOLUME */

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

audio.volume = 0.7;


/* LIKE */

likeBtn.addEventListener("click", () => {

    liked = !liked;

    if (liked) {

        likeBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    } else {

        likeBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i>';
    }

});


/* SEARCH */

searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();

    const filteredSongs =
        songs.filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );

    displaySongs(filteredSongs);

});


/* CREATE PLAYLIST */

document
    .getElementById("createPlaylist")
    .addEventListener("click", () => {

        const name = prompt(
            "Enter playlist name:"
        );

        if (!name) return;

        const playlistList =
            document.getElementById("playlistList");

        const p =
            document.createElement("p");

        p.textContent = name;

        playlistList.appendChild(p);

    });


/* KEYBOARD SHORTCUTS */

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();

        playBtn.click();
    }

    if (event.code === "ArrowRight") {

        nextBtn.click();
    }

    if (event.code === "ArrowLeft") {

        prevBtn.click();
    }

});