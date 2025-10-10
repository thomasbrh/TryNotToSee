'use strict';
/* 
const form = document.getElementById('form-user-input');
    const pseudoInput = document.getElementById('user-input');
    const errorDiv = document.getElementById('pseudoError');

    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Empêche le formulaire de se soumettre

      const pseudo = pseudoInput.value.trim();

      if (pseudo === '') {
        errorDiv.textContent = "Veuillez entrer un pseudo pour jouer.";
        pseudoInput.focus(); // Ramène le focus sur le champ pour les lecteurs d’écran
      } else {
        errorDiv.textContent = "";
        // Ici tu peux lancer ton jeu
        alert(`Bienvenue ${pseudo}! Le jeu commence.`);
        // Exemple : rediriger vers la page du jeu
        // window.location.href = "jeu.html?pseudo=" + encodeURIComponent(pseudo);
      }
    }); */

const music = document.getElementById('music');
const startBtn = document.getElementById('sound-btn');
const gameContainer = document.getElementById('game-container');
const soundBtn = document.getElementById('sound-btn');

soundBtn.addEventListener('click', () => {
  const on = ;
  const off = ;
  music.play();
  if() {

  }

});

window.addEventListener('scroll', () => {
  const rect = gameContainer.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;

  if (inView) {
    // Section visible → on coupe la musique
    music.pause();
  } else {
    // Sinon, on relance
    if (music.paused) music.play();
  }
});
    