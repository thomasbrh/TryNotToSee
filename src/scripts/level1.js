export class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    let UIElements = [];
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
    })

    preload() {
    }
    
    create() {
        // Initialise les touches
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.keyNumPad0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO)
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