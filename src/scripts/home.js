'use strict';
// formulaire

// récupére l'élément avec l'id
const form = document.getElementById('user-form');

form.addEventListener('submit', function(event) {
    // Empêche le rechargement automatique de la page au moment de la soumission
    event.preventDefault();

    console.log('test');

    // Prend la valeur entrée dans le champ texte ayant l’ID "user-input
    const usernameInput = document.getElementById('user-input').value;

    // Sauvegarde dans le localStorage
    localStorage.setItem('user-input', usernameInput); // enregistre la valeur sous la clé "user-input"

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