'use strict';

/* import Lib */
/* import animation GSAP */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* import fichier */
import './base.js';
import './home.js';
import './blur.js';
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

console.log('main');