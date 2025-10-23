// add music
const music = document.getElementById('music');
const gameContainer = document.getElementById('game-container');

const soundBtn = document.getElementById('sound-btn');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
let isPlaying = false;

const VolumeBtnUp = document.getElementById('volume-btn-up');
const VolumeBtnDown = document.getElementById('volume-btn-down');


// volume control
VolumeBtnUp.addEventListener('click', () => {
    music.volume += 0.1;
    console.log(music.volume);
});
VolumeBtnDown.addEventListener('click', () => {
    music.volume -= 0.1;
    console.log(music.volume);
});


// Bouton principal
soundBtn.addEventListener('click', async () => {
    try {
        if (music.paused) {
            await music.play();
        } 
        
        else {
            music.pause();
        }
    } 
    catch (err) {
        console.warn('Autoplay bloqué par le navigateur :', err);
    }
});

// Sync btn
music.addEventListener('play', () => {
    isPlaying = true;
    pauseBtn.classList.remove('disabled');
    playBtn.classList.add('disabled');
});
music.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.classList.remove('disabled');
    pauseBtn.classList.add('disabled');
});


// pause music when the game is on screen
window.addEventListener('scroll', () => {
    const rect = gameContainer.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView && !music.paused) {
        music.pause();
    } 
    else if (!inView && isPlaying && music.paused) {
        music.play();
    }
});