'use strict';

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

if (pageId === 'score') {
    import('./score.js');
    console.log('score.js')
}


console.log('main.js');