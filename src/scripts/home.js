'use strict';
// formulaire
let formSubmitted = false; // état initial

// Pré-remplir avec un pseudo aléatoire
const guestName = `Joueur_${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`;
document.getElementById('user-input').value = guestName;

// Valider avec Entrée ou Espace depuis n'importe où sur la page
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (formSubmitted) return;
        formSubmitted = true;
        const inputEl = document.getElementById('user-input');
        const username = inputEl.value.trim() || guestName;
        localStorage.setItem('user-input', username);
        window.location.href = './pages/blur.html';
    }
});

// récupére l'élément avec l'id
const form = document.getElementById('user-form');

form.addEventListener('submit', function(event) {
    // Empêche le rechargement automatique de la page au moment de la soumission
    event.preventDefault();
    if (formSubmitted) return;
    formSubmitted = true;
    
    // Prend la valeur entrée dans le champ texte ayant l’ID "user-input
    const usernameInput = document.getElementById('user-input').value;
    
    // Sauvegarde dans le localStorage
    localStorage.setItem('user-input', usernameInput); // enregistre la valeur sous la clé "user-input"
    
    window.location.href = './pages/blur.html';
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