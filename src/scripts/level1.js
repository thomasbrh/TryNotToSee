export class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

/*     let UIElements = [];
    let currentHighlight;

    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'arrowRight':
                // si on appuie sur la flèche droite
                break;
            case 'arrowLeft':
                // si on appuie sur la flèche gauche
                break;
            default:
                break;
        }
    }) */

    preload() {
        // load les images
        this.load.image("hand", "./assets/images/level1/Lvl01_hand.svg");
        
        this.load.image("background_level1", "./assets/images/level1/Lvl01_background.webp");

        this.load.image("rebecca", "./assets/images/level1/Lvl01_coworker_rebecca.svg");
        this.load.image("dylan", "./assets/images/level1/Lvl01_coworker_dylan.svg");
        this.load.image("yasmine", "./assets/images/level1/Lvl01_coworker_yasmine.svg");
        this.load.image("lee", "./assets/images/level1/Lvl01_boss_lee.svg");
    }
    
    create() {
        // initialise les touches
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.keyNumPad0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);

        // affichage des images
        const bg = this.add.image(0, 0, 'background_level1').setOrigin(0, 0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;
        
        this.add.image(150, 535, "hand");

        this.add.image(500, 385, "rebecca");
    }
    
    update() {
        if (this.cursors.left.isDown) {
        console.log('Gauche');
        }
        if (this.cursors.right.isDown) {
        console.log('Droite');
        }
        if (this.cursors.up.isDown) {
        console.log('Haut');
        }
        if (this.cursors.down.isDown) {
        console.log('Bas');
        }
        if (this.keyCTRL.isDown) {
        console.log('CTRL');
        }
        if (this.keyNumPad0.isDown) {
        console.log('NumPad0');
        }
    } 
}

console.log('level1')