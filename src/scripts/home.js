'use strict';
//USER FORM
const form = document.getElementById('user-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    window.location.href = '/pages/blur.html';

    console.log('test');

    // Get the entered username
    const usernameInput = document.getElementById('user-input').value;

    // Save the username in localStorage
    localStorage.setItem('user-input', usernameInput);

    console.log('Username saved:', usernameInput);
});


/* import Lib */
/* import animation GSAP */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// animation base
gsap.to('.logo-animation', {
    scale: 1.05,
    y: 10,
    rotation: 4,
    duration: 4,
    yoyo: true,
    repeat: -1,
});

gsap.to('.rotate', {
    '--scale': 1.1,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
});