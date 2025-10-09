export class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    // let UIElements = [];
    // let currentHighlight;
    // let remainingCharacters = [];
    // let currentCharacter;
    // let silhouettes = [];

    
    // document.addEventListener('keydown', (e) => {
    //     switch(e.key) {
    //         case 'arrowRight':
    //             // si on appuie sur la flèche droite
    //             break;
    //         case 'arrowLeft':
    //             // si on appuie sur la flèche gauche
    //             break;
    //         default:
    //             break;
    //     }
    // })
      

    preload() {
        // load informations characters
        this.characters = [
            {
                name: 'rebecca',
                shadow: [
                    "shadow-rebecca-right",
                    "shadow-rebecca-wrong01",
                    "shadow-rebecca-wrong02",
                    ],
                correctShadow: "shadow-rebecca-right"
            },
            {
                name: 'dylan',
                shadow: [
                    "shadow-dylan-right",
                    "shadow-dylan-wrong01",
                    "shadow-dylan-wrong02",
                ],
                correctShadow: "shadow-dylan-right"
            },
            {
                name: 'jasmine',
                shadow: [
                    "shadow-jasmine-right",
                    "shadow-jasmine-wrong01",
                    "shadow-jasmine-wrong02",
                ],
                correctShadow: "shadow-jasmine-right"
            },
            {
                name: 'lee',
                shadow: [
                    "shadow-lee-right",
                    "shadow-lee-wrong01",
                    "shadow-lee-wrong02",
                ],
                correctShadow: "shadow-lee-right"
            },
        ];

        // load the images
        this.load.image("hand", "./assets/images/level1/Lvl01_hand.svg");
        
        this.load.image("background_level1", "./assets/images/level1/Lvl01_background.webp");

        this.load.image("rebecca", "./assets/images/level1/Lvl01_coworker_rebecca.svg");
        this.load.image("dylan", "./assets/images/level1/Lvl01_coworker_dylan.svg");
        this.load.image("jasmine", "./assets/images/level1/Lvl01_coworker_jasmine.svg");
        this.load.image("lee", "./assets/images/level1/Lvl01_boss_lee.svg");
        // load the silhouettes
        // rebecca
        this.load.image("shadow-rebecca-right", "./assets/images/level1/shadow/Shadow_rebecca_right.svg");
        this.load.image("shadow-rebecca-wrong01", "./assets/images/level1/shadow/Shadow_rebecca_wrong01.svg");
        this.load.image("shadow-rebecca-wrong02", "./assets/images/level1/shadow/Shadow_rebecca_wrong02.svg");
        // dylan 
        this.load.image("shadow-dylan-right", "./assets/images/level1/shadow/Shadow_dylan_right.svg");
        this.load.image("shadow-dylan-wrong01", "./assets/images/level1/shadow/Shadow_dylan_wrong01.svg");
        this.load.image("shadow-dylan-wrong02", "./assets/images/level1/shadow/Shadow_dylan_wrong02.svg");
        // jasmine 
        this.load.image("shadow-jasmine-right", "./assets/images/level1/shadow/Shadow_jasmine_right.svg");
        this.load.image("shadow-jasmine-wrong01", "./assets/images/level1/shadow/Shadow_jasmine_wrong01.svg");
        this.load.image("shadow-jasmine-wrong02", "./assets/images/level1/shadow/Shadow_jasmine_wrong02.svg");
        // lee 
        this.load.image("shadow-lee-right", "./assets/images/level1/shadow/Shadow_lee_right.svg");
        this.load.image("shadow-lee-wrong01", "./assets/images/level1/shadow/Shadow_lee_wrong01.svg"); 
        this.load.image("shadow-lee-wrong02", "./assets/images/level1/shadow/Shadow_lee_wrong02.svg");
        
    }
    
    create() {
        // initialisation of the keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.keyNumPad0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);

        // add the background
        const bg = this.add.image(0, 0, 'background_level1').setOrigin(0, 0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;
        
        // add the fixed images
        this.add.image(150, 535, "hand");

        // choose a random characters
        const randomIndex = Phaser.Math.Between(0, this.characters.length - 1);
        const currentCharacter = this.characters[randomIndex];
        console.log(randomIndex)
        console.log(currentCharacter)
        
        // add the image of the characters
        this.characterImage = this.add.image(450, 405, currentCharacter.name);

        let shadows = currentCharacter.shadow;
        console.log(shadows);
        
        //randomize the silhouettes apparitions
        shadows.sort(() => Math.random() - 0.5);

        // add the silhouettes
        for (let i = 0; i < 3; i++) {
            const x = 825;
            const y = 135 + i * 200;

            // Crée un objet Graphics
            const graphics = this.add.graphics();

            // Couleur de remplissage (fond)
            graphics.fillStyle(0xF8E3CE, 1);

            // Bordure (stroke)
            graphics.lineStyle(2, 0x633116, 1); // épaisseur, couleur, opacité

            // Dessine un rectangle arrondi
            const width = 175;
            const height = 175;
            const radius = 18;

            graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
            graphics.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);

            // Ajoute ta shadow au-dessus
            const shadow = this.add.image(x, y, shadows[i]).setScale(0.3);
            }

        // for (let i = 0; i < 3; i++) {
        //     // display the bg
        //     const x = 825;
        //     const y = 132 + i * 200;
        //     const graphics = this.add.graphics();
        //     graphics.fillStyle(0xF8E3CE, 1); // ta couleur
        //     graphics.fillRoundedRect(x - 85, y - 85, 175, 175, 18); // (x, y, width, height, radius)
        //     /* bg.setStrokeStyle(3, 0x633116, 0.5); */



        //     // display the shadows
        //     const currentShadow = shadows[i];
        //     this.add.image(825, 132 + i * 200, currentShadow).setScale(0.3);
        //     console.log(currentShadow);
        // }
     
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

console.log('level1');