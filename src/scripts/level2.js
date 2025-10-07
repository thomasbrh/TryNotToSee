export class level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }

    preload() {
        this.load.image('background', './assets/images/decors/Home_background.webp');
        this.load.image('logo', './assets/images/logo/logo.svg');
    }
    
    create() {
        this.add.image(400, 300, 'logo');
        this.add.image(400, 300, 'background');
    }
    
    update() {
    
    }
}

console.log('level2');