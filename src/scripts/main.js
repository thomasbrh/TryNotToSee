'use strict'; // Attention de bien mettre type="module" dans la balise script du html
import {level1} from './level1.js';
import {level2} from './level2.js';
import {level3} from './level3.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [level1, level2, level3],
    physics: {
    default: 'arcade',
    }
};

new Phaser.Game(config);

/* Import animation GSAP */
/* import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './Animations.js'; */
console.log('main');