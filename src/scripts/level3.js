export class level3 extends Phaser.Scene {
    constructor() {
        super('level3');
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

console.log('level3');