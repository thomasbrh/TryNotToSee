// add music
// Importe le son
// Empêche de recréer plusieurs musiques en même temps
if (!window.globalMusic) {

    const pageId = document.body.id;

    const audioPath = pageId === 'home'
    ? './assets/images/sound/music-bg.mp3'
    : '../assets/images/sound/music-bg.mp3';


    if (pageId === 'game') {
        console.log('Music désactivée');
    } else {
        // équivalent de l'ancien html (glovbal)
        const music = new Audio(audioPath);
        console.log('Chargement musique depuis :', audioPath);
        music.loop = true;
        music.volume = parseFloat(localStorage.getItem('musicVolume')) || 0.5;

        // Reprends le temps précédent
        const lastTime = localStorage.getItem('musicTime');
        if (lastTime) music.currentTime = parseFloat(lastTime);

        // Démarre la lecture
        if ( pageId != 'home' ) music.play().catch(err => {
            console.warn('Autoplay bloqué par le navigateur :', err);
        }); else { music.pause() }

        // Sélection des éléments HTML utilisés
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

                else if (music.paused) {
                    music.play();
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


        // Sauvegarde de la position toutes les 2 secondes
        setInterval(() => {
            localStorage.setItem('musicTime', music.currentTime);
        }, 2000);

        // Sauvegarde du volume quand il change
        music.addEventListener('volumechange', () => {
            localStorage.setItem('musicVolume', music.volume);
        });

        // Rendre accessible globalement
        window.globalMusic = music;
    }
}