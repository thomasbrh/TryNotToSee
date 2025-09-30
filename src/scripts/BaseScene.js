export default class BaseScene extends Phaser.Scene {
constructor(key) {
    super(key);
}

preload() {
    this.load.image('logo', 'assets/images/logo/logo.svg');
}

create() {
    // Initialise les touches
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    this.keyNumPad0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);

    // Affiche une image
    this.add.image(400, 300, 'logo');
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