'use strict';
/* import Lib */
/* import animation GSAP */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const pageId = document.body.id;

/* import fichier */
import './base.js';

if (pageId === 'home') {
  import('./home.js');
  console.log('home.js')
}

if (pageId === 'blur') {
  import('./blur.js');
  console.log('blur.js')
}

if (pageId === 'game') {
  Promise.all([
    import('./level1.js'),
    import('./level2.js')
  ]).then(([{ level1 }, { level2 }]) => {
    const config = {
      type: Phaser.AUTO,
      width: 986,
      height: 675,
      parent: 'game-container',
      scene: [level1, level2],
      physics: { default: 'arcade' },
    };
    new Phaser.Game(config);
  });

  console.log('phaser.js')
}


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

console.log('main.js');