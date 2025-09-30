'use strict'; // Attention de bien mettre type="module" dans la balise script du html

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BaseScene, MenuScene],
    physics: {
      default: 'arcade',
  }
  };
  
const game = new Phaser.Game(config);

import BaseScene from './BaseScene.js';
import MenuScene from './MenuScene.js';
/* Import animation GSAP */
/* import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './Animations.js'; */
