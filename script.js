let audio, playPauseButton, prevButton, nextButton, albumArt, trackName, albumName, currentTime, trackLength, sArea, sHover, seekBar, insTime, bufferBox;
let isPlaying = false, trackIndex = 0;
let songs = [
    { name: "<3", album: "Rokutousei no yoru", src: "https://github.com/xxy-ian/mp3.xxy/raw/main/Rokutouseino%20Yoru.mp3", cover: "http://i.pinimg.com/736x/3d/5c/2d/3d5c2d29c5181b0ac317208c25a39b5a.jpg" },
    { name: "<3", album: "Dandelions", src: "https://github.com/xxy-ian/mp3.xxy/raw/main/Dandelions%20~nc.mp3", cover: "https://i.pinimg.com/736x/85/4d/c3/854dc35126e60d81f84eab10eab1688a.jpg" },
    { name: "<3", album: "Sa'yo", src: "https://github.com/xxy-ian/mp3.xxy/raw/main/Sa'yo.mp3", cover: "https://i.pinimg.com/736x/21/d3/f2/21d3f216ffcef658b5f2535aee167dab.jpg" },
    { name: "<3", album: "Long live", src: "https://github.com/xxy-ian/mp3.xxy/raw/main/Long%20Live.mp3", cover: "https://i.pinimg.com/736x/fd/36/f4/fd36f4393cdff7eaad2bb0cd3d308715.jpg" },
    { name: "<3", album: "Night flower", src: "https://github.com/xxy-ian/mp3.xxy/raw/main/Night%20Flower.mp3", cover: "https://i.pinimg.com/736x/7c/2e/55/7c2e555844675bb69ac3ea9af75568bf.jpg" }
];

window.onload = function() {
    playPauseButton = document.getElementById("play-pause");
    prevButton = document.getElementById("prev-track");
    nextButton = document.getElementById("next-track");
    albumArt = document.getElementById("album-art").getElementsByTagName("img")[0];
    trackName = document.getElementById("track-name");
    albumName = document.getElementById("album-name");
    currentTime = document.getElementById("current-time");
    trackLength = document.getElementById("track-length");
    sArea = document.getElementById("s-area");
    seekBar = document.getElementById("seek-bar");
    
    audio = new Audio();
    loadTrack(trackIndex);

    playPauseButton.addEventListener("click", playPause);
    prevButton.addEventListener("click", prevTrack);
    nextButton.addEventListener("click", nextTrack);
    audio.addEventListener("ended", nextTrack);
    audio.addEventListener("timeupdate", updateProgress);
    sArea.addEventListener("click", setTrackProgress);
};

function loadTrack(index) {
    audio.src = songs[index].src;

    // ✅ Update song title & album name
    trackName.textContent = songs[index].name;
    albumName.textContent = songs[index].album;

    // ✅ Update album cover
    albumArt.src = songs[index].cover;

    // ✅ Check if music is playing and continue spinning
    if (isPlaying) {
        albumArt.classList.add("spinning");
    } else {
        albumArt.classList.remove("spinning");
    }

    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.classList.remove("spinning");
    } else {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.classList.add("spinning"); // ✅ Keep spinning when playing
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + songs.length) % songs.length;
    loadTrack(trackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    albumArt.classList.add("spinning"); // ✅ Keep spinning
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % songs.length;
    loadTrack(trackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    albumArt.classList.add("spinning"); // ✅ Keep spinning
}


function updateProgress() {
    if (!isNaN(audio.duration)) {
        let currentTimeValue = audio.currentTime;
        let durationValue = audio.duration;

        let curMinutes = Math.floor(currentTimeValue / 60);
        let curSeconds = Math.floor(currentTimeValue % 60);
        let durMinutes = Math.floor(durationValue / 60);
        let durSeconds = Math.floor(durationValue % 60);

        curMinutes = curMinutes < 10 ? "0" + curMinutes : curMinutes;
        curSeconds = curSeconds < 10 ? "0" + curSeconds : curSeconds;
        durMinutes = durMinutes < 10 ? "0" + durMinutes : durMinutes;
        durSeconds = durSeconds < 10 ? "0" + durSeconds : durSeconds;

        currentTime.textContent = `${curMinutes}:${curSeconds}`;
        trackLength.textContent = `${durMinutes}:${durSeconds}`;

        let progress = (currentTimeValue / durationValue) * 100;
        seekBar.style.width = progress + "%";
    }
}

function setTrackProgress(event) {
    let seekBarWidth = sArea.clientWidth;
    let offsetX = event.offsetX;
    let percentage = offsetX / seekBarWidth;
    let seekTime = percentage * audio.duration;

    if (!isNaN(seekTime)) {
        audio.currentTime = seekTime;
    }
}