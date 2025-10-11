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


// add music
const music = document.getElementById('music');
const gameContainer = document.getElementById('game-container');
const soundBtn = document.getElementById('sound-btn');
const startBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
let isPlaying = false;

soundBtn.addEventListener('click', () => {
  isPlaying = !isPlaying
  console.log(isPlaying)

  startBtn.classList.toggle('disabled', isPlaying);
  pauseBtn.classList.toggle('disabled', !isPlaying);
  
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
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