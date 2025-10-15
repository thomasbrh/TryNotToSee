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
        

        // add the bg blur
        /* document.addEventListener("blurChanged", (e) => {
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
        }); */

        // état initial du blur (nouvelle variable)
        this.isBlurred = (window.blurValue === "non"); // true = flou activé

        // add the bg blur listener (met à jour le flag et applique le blur aux objets existants)
        document.addEventListener("blurChanged", (e) => {
            const shouldBlurNow = (e.detail === "non");
            this.isBlurred = shouldBlurNow; // garde l'état courant
            // bg
            if (shouldBlurNow) {
                bg.preFX.clear();
                bg.preFX.addBlur(1);
            } else {
                bg.preFX.clear();
            }
            // character (si il existe)
            if (this.characterImage) {
                this.characterImage.preFX.clear();
                if (shouldBlurNow) this.characterImage.preFX.addBlur(1);
            }
            // hand
            if (shouldBlurNow) {
                hand.preFX.clear();
                hand.preFX.addBlur(1);
            } else {
                hand.preFX.clear();
            }
        });

        // helper : applique (ou retire) le blur sur un sprite selon this.isBlurred
        this.applyBlurTo = (sprite) => {
            if (!sprite) return;
            // sécurité : vérifier que preFX existe
            if (!sprite.preFX) return;
            sprite.preFX.clear();
            if (this.isBlurred) sprite.preFX.addBlur(1);
        };
        


<<<<<<< HEAD
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
=======
        // --- INITIALISATION V2 ---
        this.remainingCharacters = [...this.characters]; // copie
        this.score = 0;
        this.currentCharacter = null;
        this.shadowGroup = null;
        
        // résultats détaillés (pour affichage final)
        this.results = JSON.parse(localStorage.getItem("level1_results") || "[]");
        
        // fonction pour charger un nouveau personnage
        this.loadNextCharacter = () => {
            // si plus de personnages => fin
            if (this.remainingCharacters.length === 0) {
                console.log("level 1 terminé");
                // sauvegarde finale
                localStorage.setItem("level1_score", this.score);
                localStorage.setItem("level1_results", JSON.stringify(this.results));
                
                // affiche le score final
                this.add.rectangle(this.cameras.main.centerX, 260, 520, 120, 0x000000, 0.6).setOrigin(0.5);
                this.add.text(this.cameras.main.centerX, 260, `Score final : ${this.score}/4`, { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
                return;
            }
            
            // supprime ancien personnage et ombres si présents
            if (this.characterImage) {
                this.characterImage.destroy();
                this.characterImage = null;
            }
            if (this.shadowGroup) {
                // détruit tous les enfants et le groupe
                this.shadowGroup.clear(true, true);
                this.shadowGroup.destroy(true);
                this.shadowGroup = null;
            }
            
            // sélection aléatoire du personnage suivant
            const index = Phaser.Math.Between(0, this.remainingCharacters.length - 1);
            this.currentCharacter = this.remainingCharacters.splice(index, 1)[0];
            
            // ajoute l'image du personnage
            this.characterImage = this.add.image(450, 405, this.currentCharacter.name);
            this.applyBlurTo(this.characterImage); // applique le flou à l'image du personnage
            
            // crée un groupe pour les shadows
            this.shadowGroup = this.add.group();
            
            // mélange des 3 ombres
            const shuffledShadows = Phaser.Utils.Array.Shuffle([...this.currentCharacter.shadow]);
            
            // --- crée les 3 blocs ombre/cliquables (version avec Zone) ---
            shuffledShadows.forEach((shadowKey, i) => {
                const x = 825;
                const y = 135 + i * 200;
                const width = 175;
                const height = 175;
                const radius = 18;
                
                // fond du bloc + les bordures
                const graphics = this.add.graphics();
                graphics.fillStyle(0xF8E3CE, 1);
                graphics.lineStyle(2, 0x633116, 1);
                graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                graphics.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                
                // Ajoute shadow
                const shadowImg = this.add.image(x, y, shadowKey).setScale(0.3);
                
                // création d'une zone interactive par dessus le bloc (centre = x,y)
                const zone = this.add.zone(x, y, width, height).setOrigin(0.5).setInteractive({ useHandCursor: true });
                
                // stocke des meta : stocke des informations utiles à l’objet pour pouvoir les récupérer plus tard quand on clique dessus (savoir quelle shadow a été cliquée).
                zone._meta = { shadowKey, graphics, x, y, width, height };
                
                // hover (optionnel car pc)
                zone.on('pointerover', () => {
                    graphics.clear();
                    graphics.fillStyle(0xF8E3CE, 1);
                    graphics.lineStyle(3, 0x8B5E3C, 1); // bord plus large au survol
                    graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                    graphics.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                });
                zone.on('pointerout', () => {
                    graphics.clear();
                    graphics.fillStyle(0xF8E3CE, 1);
                    graphics.lineStyle(2, 0x633116, 1);
                    graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                    graphics.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                });
                
                // clic sur le bloc
                zone.on('pointerdown', () => {
                    // désactiver toutes les interactions pour éviter les double-clics
                    if (this.shadowGroup) {
                        this.shadowGroup.getChildren().forEach(child => {
                            if (child.disableInteractive) child.disableInteractive();
                        });
                    }
                    
                    const chosen = zone._meta.shadowKey;
                    const isCorrect = chosen === this.currentCharacter.correctShadow;
                    
                    // bordure verte er rouge
                    const feedback = this.add.graphics();
                    feedback.lineStyle(6, isCorrect ? 0x2ecc71 : 0xe74c3c, 1);
                    const gx = zone._meta.x - zone._meta.width / 2;
                    const gy = zone._meta.y - zone._meta.height / 2;
                    feedback.strokeRoundedRect(gx, gy, zone._meta.width, zone._meta.height, 18);
                    
                    // met à jour le score
                    if (isCorrect) this.score++;
                    this.results.push({
                        character: this.currentCharacter.name,
                        chosenShadow: chosen,
                        correctShadow: this.currentCharacter.correctShadow,
                        correct: isCorrect
                    });
                    
                    localStorage.setItem("level1_score", this.score);
                    localStorage.setItem("level1_results", JSON.stringify(this.results));
                    
                    // petit délai puis => au personnage suivant
                    this.time.delayedCall(700, () => {
                        feedback.destroy();
                        this.loadNextCharacter();
                    });
                });
                
                // ajoute les objets au shadowGroup pour facilité
                this.shadowGroup.add(graphics);
                this.shadowGroup.add(shadowImg);
                this.shadowGroup.add(zone);
            });
        }; // fin this.loadNextCharacter
        
        // APPEL initial (doit être en dehors)
        this.loadNextCharacter();


        // --- TIMER ---
        this.chrono = 0;
        this.chronoText = this.add.text(16, 100, "Time: 0", { fontSize: "24px", fill: "#FFFFFF" });
        
        this.monTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.chrono += 1;
                this.chronoText.setText("Time: " + this.chrono);
            },
            loop: true
        });
    }
    
>>>>>>> levels
    
    update() {

        //TIMER INFOS

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