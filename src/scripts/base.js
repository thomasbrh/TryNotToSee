// add music
// Sélection des éléments HTML utilisés
const music = document.getElementById('music');
const gameContainer = document.getElementById('game-container');

const soundBtn = document.getElementById('sound-btn');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
let isPlaying = false;

// Boutons pour régler le volume
const VolumeBtnUp = document.getElementById('volume-btn-up');
const VolumeBtnDown = document.getElementById('volume-btn-down');


// volume control +
VolumeBtnUp.addEventListener('click', () => {
    music.volume += 0.1;
    console.log(music.volume);
});
// volume control -
VolumeBtnDown.addEventListener('click', () => {
    music.volume -= 0.1;
    console.log(music.volume);
});


// Bouton principal
soundBtn.addEventListener('click', async () => {
    try {
        // Si la musique est en pause alors lecture
        if (music.paused) {
            await music.play(); // await pour gérer les navigateurs qui bloquent l’autoplay
        } 
        
        else {
            music.pause();
        }
    } 
    catch (err) {
        // Certains navigateurs bloquent la lecture automatique
        console.warn('Autoplay bloqué par le navigateur :', err);
    }
});

// Sync btn
music.addEventListener('play', () => {
    // Quand la musique commence
    isPlaying = true; // playing
    playBtn.classList.remove('disabled');
    pauseBtn.classList.add('disabled');
});
music.addEventListener('pause', () => {
    // Quand la musique s’arrête
    isPlaying = false; // stop
    pauseBtn.classList.remove('disabled');
    playBtn.classList.add('disabled');
});


// pause music when the game is on screen
window.addEventListener('scroll', () => {
    // Récupère la position du conteneur du jeu dans la fenêtre
    const rect = gameContainer.getBoundingClientRect();
    // Vérifie si le jeu est actuellement visible à l’écran
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    // Si visible alors on met la musique en pause
    if (inView && !music.paused) {
        music.pause();
    } 
    // Si n’est plus visible + que la musique était active alors on relance la lecture
    else if (!inView && isPlaying && music.paused) {
        music.play();
    }
});