'use strict';

/* import Lib */
/* import animation GSAP */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* import fichier */
import './blur.js';
import './home.js';
import {level1} from './level1.js';
import {level2} from './level2.js';

const config = {
    type: Phaser.AUTO,
    width: 986 /* window.innerWidth */,
    height: 675 /* window.innerHeight */,
    parent: 'game-container',
    scene: [level1, level2],
    physics: {
    default: 'arcade',
    }
};

new Phaser.Game(config);

console.log('main');