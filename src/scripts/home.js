'use strict';
//USER FORM

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-form');
  const startButton = document.querySelector('.start-button');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the entered username
    const usernameInput = document.getElementById('user-input').value;

    // Save the username in localStorage
    localStorage.setItem('user-input', usernameInput);

    console.log('Username saved:', usernameInput);
  });
});


//ADD MUSIC
const music = document.getElementById('music');
const startBtn = document.getElementById('sound-btn');
const gameContainer = document.getElementById('game-container');
const soundBtn = document.getElementById('sound-btn');

/* soundBtn.addEventListener('click', () => {
  const on = ;
  const off = ;
  music.play();
  if() {

  }

}); */

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
    