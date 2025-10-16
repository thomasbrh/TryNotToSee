export class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

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

        let rebecca = this.load.image("rebecca", "./assets/images/level1/Lvl01_coworker_rebecca.svg");
        let dylan = this.load.image("dylan", "./assets/images/level1/Lvl01_coworker_dylan.svg");
        let jasmine = this.load.image("jasmine", "./assets/images/level1/Lvl01_coworker_jasmine.svg");
        let lee = this.load.image("lee", "./assets/images/level1/Lvl01_boss_lee.svg");
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
        // const blur 
        const blurState = window.blurValue; // récupère la valeur du bouton
        const shouldBlur = (blurState === "non"); // "non" = flou activé

        // initialisation of the keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.keyNumPad0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);

        // add the background
        const bg = this.add.image(0, 0, 'background_level1').setOrigin(0, 0);

        // resize background
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;   
        
        // add the fixed images
        const hand = this.add.image(150, 535, "hand");

        // choose a random characters
        const randomIndex = Phaser.Math.Between(0, this.characters.length - 1);
        const currentCharacter = this.characters[randomIndex];
        console.log(randomIndex)
        console.log(currentCharacter)
        
        // add the image of the characters
        this.characterImage = this.add.image(450, 405, currentCharacter.name);

        // add the bg blur
        document.addEventListener("blurChanged", (e) => {
        const shouldBlurNow = (e.detail === "non");
        if (shouldBlurNow) {
            bg.preFX.clear();
            bg.preFX.addBlur(1);
        } else {
            bg.preFX.clear();
        }
        
        // add character blur
        if (shouldBlurNow) {
            this.characterImage.preFX.clear();
            this.characterImage.preFX.addBlur(1);
        } else {
            this.characterImage.preFX.clear();
        }

        // add blurhand
        if (shouldBlurNow) {
            hand.preFX.clear();
            hand.preFX.addBlur(1);
        } else {
            hand.preFX.clear();
        }
        });

        let shadows = currentCharacter.shadow;
        
        //randomize the silhouettes apparitions
        shadows.sort(() => Math.random() - 0.5);

        // add the silhouettes
        for (let i = 0; i < 3; i++) {

            //coordonnées des silhouettes
            const x = 825;
            const y = 135 + i * 200;

            // Crée un objet Graphics (fond)
            const graphics = this.add.graphics();

            // Couleur de remplissage (fond)
            graphics.fillStyle(0xF8E3CE, 1);

            // Bordure (stroke-fond)
            graphics.lineStyle(2, 0x633116, 1); // épaisseur, couleur, opacité

            // Dessine un rectangle arrondi(border-radius)
            const width = 175;
            const height = 175;
            const radius = 18;

            graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
            graphics.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);

            // Ajoute shadow
            const shadowImage = this.add.image(x, y, shadows[i]).setScale(0.3);
        }


        //BTN "c'est parti!" QUI DECLENCHE TIMER

        const graphics = this.add.graphics();
        graphics.fillStyle(0xD9C667, 1); // couleur du fond
        graphics.fillRoundedRect(440, 350, 170, 55, 25);

        const timerButton = this.add.text(452, 360, "C'est parti !", { fill: 'white', backgroundColor: '#D9C667', fontSize: '32px', fontFamily: "dynapuff-condensed", borderRadius: "15" });

        timerButton.setInteractive();

        timerButton.on('pointerdown', () => {
            monTimer.paused = false;
            timerButton.setVisible(false);
            graphics.setVisible(false);
        });

        //TIMER
        var chronoText;
        var monTimer;
        var chrono = 0;

        monTimer = this.time.addEvent({
            delay: 1000,
            callback: compteUneSeconde,
            callbackScope: this,
            startAt: 0,
            paused: true,
            loop: true
        });

        function compteUneSeconde () {
            chrono= chrono+1
        }

        chronoText = this.add.text(16, 100, "Time: 0", {
            fontSize: "24px",
            fill: "#FFFFFF"
        });

        function compteUneSeconde () {
            chrono= chrono+1;
            chronoText.setText("Time: "+ chrono);
        }

        var elapsed = monTimer.getElapsedSeconds();

        console.log('Temps écoulé :', elapsed, 's');
    }
    
    update() {
        // écoute des touches
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