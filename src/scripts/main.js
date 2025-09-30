'use strict'; // Attention de bien mettre type="module" dans la balise script du html
import {MenuScene} from './MenuScene.js';
import {BaseScene} from './BaseScene.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BaseScene, MenuScene],
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