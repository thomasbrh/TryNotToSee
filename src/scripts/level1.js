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
        this.remainingCharacters = [...this.characters];
        this.validatedCharacters = [];
        this.currentCharacter = null;
        this.selectedIndex = 1;
        this.shadowImages = [];
        this.shadowGraphics = [];

        // KEYS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyNumPad0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);

        // BACKGROUND
        const bg = this.add.image(0, 0, 'background_level1').setOrigin(0, 0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;
        const hand = this.add.image(150, 535, "hand");

        // Gestion du flou
        const applyBlur = (shouldBlur) => {
            // flou sur décor, main et personnage seulement
            [bg, this.characterImage, hand].forEach(obj => {
                if (!obj || !obj.preFX) return;
                obj.preFX.clear();
                if (shouldBlur) obj.preFX.addBlur(1);
            });
        };

        document.addEventListener("blurChanged", (e) => {
            const shouldBlurNow = (e.detail === "non");
            applyBlur(shouldBlurNow);
        });

        // TIMER
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

        function compteUneSeconde() {
            chrono = chrono + 1;
            chronoText.setText("Time: " + chrono);
        }

        chronoText = this.add.text(16, 100, "Time: 0", {
            fontSize: "24px",
            fill: "#FFFFFF"
        });

        var elapsed = monTimer.getElapsedSeconds();
        console.log('Temps écoulé :', elapsed, 's');

        // harger un personnage
        this.loadNewCharacter = () => {
            if (this.characterImage) this.characterImage.destroy();
            this.shadowImages.forEach(img => img.destroy());
            this.shadowGraphics.forEach(g => g.destroy());
            this.shadowImages = [];
            this.shadowGraphics = [];

            if (this.remainingCharacters.length === 0) {
                console.log("Tous les personnages sont réussis !");
                // STOP TIMER
                monTimer.paused = true;
                this.add.text(452, 360, "Fin du jeu !", {
                    fontSize: "36px",
                    fill: "#FFD700",
                    fontFamily: "dynapuff-condensed"
                }).setOrigin(0.5);
                return;
            }

            const randomIndex = Phaser.Math.Between(0, this.remainingCharacters.length - 1);
            this.currentCharacter = this.remainingCharacters[randomIndex];
            this.characterImage = this.add.image(450, 405, this.currentCharacter.name);

            const shuffledShadows = [...this.currentCharacter.shadow].sort(() => Math.random() - 0.5);

            for (let i = 0; i < 3; i++) {
                const x = 825;
                const y = 135 + i * 200;

                const graphics = this.add.graphics();
                graphics.fillStyle(0xF8E3CE, 1);
                graphics.lineStyle(2, 0x633116, 1);
                graphics.fillRoundedRect(x - 87.5, y - 87.5, 175, 175, 18);
                graphics.strokeRoundedRect(x - 87.5, y - 87.5, 175, 175, 18);
                this.shadowGraphics.push(graphics);

                // Silhouettes
                const shadow = this.add.image(x, y, shuffledShadows[i]).setScale(0.3);
                this.shadowImages.push(shadow);
            }

            this.selectedIndex = 1;
            this.highlightSelectedShadow();
            applyBlur(window.blurValue === "non"); // garde le flou si déjà activé
        };

        // Highlight
        this.highlightSelectedShadow = () => {
            this.shadowImages.forEach((img, index) => {
                img.setTint(index === this.selectedIndex ? 0xFFD700 : 0xffffff);
            });
        };

        // Validation 
        this.validateSelection = () => {
            const selectedShadowKey = this.shadowImages[this.selectedIndex].texture.key;
            if (selectedShadowKey === this.currentCharacter.correctShadow) {
                console.log("Correct !");
                this.validatedCharacters.push(this.currentCharacter);
                this.remainingCharacters = this.remainingCharacters.filter(c => c !== this.currentCharacter);
            } else {
                console.log("Incorrect, relancer ce personnage");
            }
            this.loadNewCharacter();
        };

        // BTN START
        const graphics = this.add.graphics();
        graphics.fillStyle(0xD9C667, 1);
        graphics.fillRoundedRect(440, 350, 170, 55, 25);

        const timerButton = this.add.text(452, 360, "C'est parti !", {
            fill: 'white',
            backgroundColor: '#D9C667',
            fontSize: '32px',
            fontFamily: "dynapuff-condensed",
        }).setInteractive();

        timerButton.on('pointerdown', () => {
            monTimer.paused = false;
            timerButton.destroy();
            graphics.destroy();
            this.loadNewCharacter();
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedIndex = Phaser.Math.Clamp(this.selectedIndex - 1, 0, 2);
            this.highlightSelectedShadow();
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedIndex = Phaser.Math.Clamp(this.selectedIndex + 1, 0, 2);
            this.highlightSelectedShadow();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyNumPad0)) {
            this.validateSelection();
        }
    }
}

console.log('level1');
