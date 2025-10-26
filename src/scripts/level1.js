// Variables globales
var monTimer;
var chronoText;
var chrono = 0;

//get username by localStorage
const playerName = localStorage.getItem('user-input');

// gestion de flou global
window.blurValue = localStorage.getItem('blur-value');
console.log(window.blurValue);

// Fonction de sauvegarde du score
function saveScore(name, time) {
    // Récupère les scores existants depuis le localStorage ou crée un tableau vide
    let scores = JSON.parse(localStorage.getItem("bestScores")) || [];

    // Ajoute le nouveau score (nom + temps)
    scores.push({ name, time });
    // Trie les scores par temps
    scores.sort((a, b) => a.time - b.time); // + petit temps = meilleur score
    // Garde uniquement les 10 meilleurs
    scores = scores.slice(0, 10);
    // Sauvegarde à nouveau dans le localStorage
    localStorage.setItem("bestScores", JSON.stringify(scores));
}

// scène principale
export class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    preload() {
        // load informations characters + ombre
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
        this.load.image("hand", "../assets/images/level1/Lvl01_hand.svg");
        this.load.image("background_level1", "../assets/images/level1/Lvl01_background.webp");
        this.load.image("rebecca", "../assets/images/level1/Lvl01_coworker_rebecca.svg");
        this.load.image("dylan", "../assets/images/level1/Lvl01_coworker_dylan.svg");
        this.load.image("jasmine", "../assets/images/level1/Lvl01_coworker_jasmine.svg");
        this.load.image("lee", "../assets/images/level1/Lvl01_boss_lee.svg");

        // load the silhouettes
        // rebecca
        this.load.image("shadow-rebecca-right", "../assets/images/level1/shadow/Shadow_rebecca_right.svg");
        this.load.image("shadow-rebecca-wrong01", "../assets/images/level1/shadow/Shadow_rebecca_wrong01.svg");
        this.load.image("shadow-rebecca-wrong02", "../assets/images/level1/shadow/Shadow_rebecca_wrong02.svg");
        // dylan 
        this.load.image("shadow-dylan-right", "../assets/images/level1/shadow/Shadow_dylan_right.svg");
        this.load.image("shadow-dylan-wrong01", "../assets/images/level1/shadow/Shadow_dylan_wrong01.svg");
        this.load.image("shadow-dylan-wrong02", "../assets/images/level1/shadow/Shadow_dylan_wrong02.svg");
        // jasmine 
        this.load.image("shadow-jasmine-right", "../assets/images/level1/shadow/Shadow_jasmine_right.svg");
        this.load.image("shadow-jasmine-wrong01", "../assets/images/level1/shadow/Shadow_jasmine_wrong01.svg");
        this.load.image("shadow-jasmine-wrong02", "../assets/images/level1/shadow/Shadow_jasmine_wrong02.svg");
        // lee 
        this.load.image("shadow-lee-right", "../assets/images/level1/shadow/Shadow_lee_right.svg");
        this.load.image("shadow-lee-wrong01", "../assets/images/level1/shadow/Shadow_lee_wrong01.svg");
        this.load.image("shadow-lee-wrong02", "../assets/images/level1/shadow/Shadow_lee_wrong02.svg");

        //load des sons
        this.load.audio('correct', '../assets/images/sound-effect/Correct.mp3');
        this.load.audio('incorrect', '../assets/images/sound-effect/Incorect.mp3');
        this.load.audio('selection', '../assets/images/sound-effect/Selection.mp3');
        this.load.audio('victoire', '../assets/images/sound-effect/Victoire.mp3');
        this.load.audio('music', '../assets/images/sound-effect/music-bg.mp3');
    }

    create() {
        // son music
        this.sound.add('music', {
            volume: 0.4,
        }).play();

        // Variables
        // perso à valider
        this.remainingCharacters = [...this.characters];
        // perso valider
        this.validatedCharacters = [];
        // perso affiché
        this.currentCharacter = null;
        // index selection
        this.selectedIndex = 1;
        // ref img ombre
        this.shadowImages = [];
        // bordure autour de l'ombre
        this.shadowGraphics = [];
        // vérif en cours pour le délai
        this.enCours = false;

        // Gestion des touches clavier
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Arrière-plan
        const bg = this.add.image(0, 0, 'background_level1').setOrigin(0, 0);
        // prend tte la longueur
        bg.displayWidth = this.sys.game.config.width;
        // prend tte la hauteur
        bg.displayHeight = this.sys.game.config.height; 
        // main
        const hand = this.add.image(150, 535, "hand");

        // Gestion du flou selon l'état
        const applyBlur = (shouldBlur) => {
            // flou sur décor, main et personnage seulement
            [bg, this.characterImage, hand].forEach(obj => {
                // Sécurité si effet pré-FX non dispo
                if (!obj || !obj.preFX) return; 
                obj.preFX.clear(); 
                if (shouldBlur) obj.preFX.addBlur(1);
            });
        };
        // Applique le flou initial selon la valeur
        applyBlur(window.blurValue);

        // timer
        monTimer = this.time.addEvent({
            delay: 1000,
            callback: compteUneSeconde,
            callbackScope: this,
            startAt: 0,
            paused: true,
            loop: true
        });

        // fonction qui incrémente le chrono
        function compteUneSeconde() {
            chrono = chrono + 1;
            chronoText.setText("Time: " + chrono);
        }

        // Afficher chrono
        chronoText = this.add.text(40, 60, "Time: 0", {
            fontSize: "24px",
            fill: "#FFFFFF"
        });

        // Log du temps écoulé
        var elapsed = monTimer.getElapsedSeconds();
        console.log('Temps écoulé :', elapsed, 's');

        // Fonction pour récupérer les meilleurs scores
        function getBestScores() {
            return JSON.parse(localStorage.getItem("bestScores")) || [];
        }

        // Charger un nouveau personnage
        this.loadNewCharacter = () => {
            // Nettoie les anciens éléments
            if (this.characterImage) this.characterImage.destroy();
            this.shadowImages.forEach(img => img.destroy());
            this.shadowGraphics.forEach(g => g.destroy());
            this.shadowImages = [];
            this.shadowGraphics = [];

            //  Si plus de personnages, fin du jeu
            if (this.remainingCharacters.length === 0) {
                console.log("Tous les personnages sont réussis !");
                monTimer.paused = true;

                this.sound.add('victoire', { volume: 0.6 }).play();

                // Sauvegarde du score et chrono
                saveScore(playerName, chrono);

                // Message de fin
                this.add.text(452, 360, "Fin du jeu !", {
                    fontSize: "72px",
                    fill: "#FFD700",
                    fontFamily: "dynapuff-condensed"
                }).setOrigin(0.5);

                // 🔥 Redirection propre (même dossier que game.html)
                this.time.delayedCall(2000, () => {
                    window.location.href = './score.html';
                });

                return; // pour pas charger de nv perso
            }

            // Sélectionne un personnage aléatoire parmi ceux qui restent
            const randomIndex = Phaser.Math.Between(0, this.remainingCharacters.length - 1);
            this.currentCharacter = this.remainingCharacters[randomIndex];

            // Mélange les ombres de ce personnage
            let shuffledShadows = [];
            if (this.currentCharacter) {
                this.characterImage = this.add.image(450, 405, this.currentCharacter.name);
                shuffledShadows = [...this.currentCharacter.shadow].sort(() => Math.random() - 0.5);
            }

            // Affiche les 3 ombres dans des cadres
            for (let i = 0; i < 3; i++) {
                const x = 825;
                const y = 138 + i * 200;

                const graphics = this.add.graphics();
                graphics.fillStyle(0xF8E3CE, 1);
                graphics.lineStyle(2, 0xffffff, 1);
                graphics.fillRoundedRect(x - 87.5, y - 87.5, 175, 175, 18);
                graphics.strokeRoundedRect(x - 87.5, y - 87.5, 175, 175, 18);
                this.shadowGraphics.push(graphics);

                const shadow = this.add.image(x, y, shuffledShadows[i]).setScale(0.3);
                this.shadowImages.push(shadow);
            }

            // Réinitialise la sélection
            this.selectedIndex = 1;
            this.highlightSelectedShadow();
            applyBlur(window.blurValue === "non"); // garde le flou si déjà activé
        };


        // Fonction hover de l'ombre
        this.highlightSelectedShadow = () => {
            this.shadowGraphics.forEach((g, index) => {
                g.clear();
                // Fond inchangé
                g.fillStyle(0xF8E3CE, 1);

                // Bordure de selection
                if (index === this.selectedIndex) {
                g.lineStyle(7, 0x000000, 2);

            
                // son selection
                this.sound.add('selection', {
                    volume: 0.1,
                }).play();


                } else {
                g.lineStyle(4, 0xE3B09D, 2);
                }

                g.fillRoundedRect(825 - 87.5, 135 + index * 200 - 87.5, 175, 175, 18);
                g.strokeRoundedRect(825 - 87.5, 135 + index * 200 - 87.5, 175, 175, 18);
            });
        };


        // Validation 
        this.validateSelection = () => {
            // Vérifie si l’ombre choisie est la bonne
            const selectedShadowKey = this.shadowImages[this.selectedIndex].texture.key;
            const isCorrect = selectedShadowKey === this.currentCharacter.correctShadow;

            if (this.enCours) return; 
            this.enCours = true;

            // Couleur et texte selon le résultat
            const color = isCorrect ? 0xD9C667 : 0xD96B52;
            const message = isCorrect ? "Correct !" : "Incorrect !";

            // Change la bordure de la sélection
            const selectedGraphic = this.shadowGraphics[this.selectedIndex];
            selectedGraphic.clear();
            selectedGraphic.fillStyle(0xF8E3CE, 1);
            selectedGraphic.lineStyle(4, color, 1);
            selectedGraphic.fillRoundedRect(825 - 87.5, 135 + this.selectedIndex * 200 - 87.5, 175, 175, 18);
            selectedGraphic.strokeRoundedRect(825 - 87.5, 135 + this.selectedIndex * 200 - 87.5, 175, 175, 18);

            // Affiche le message temporaire au centre
            const resultText = this.add.text(493, 180, message, {
                fontSize: '72px',
                fill: isCorrect ? '#D9C667' : '#e7c8bdff',
                fontFamily: "dynapuff-condensed"
            }).setOrigin(0.6);


            // Marquer le personnage si bon
            // son correct
            if (isCorrect) {
                this.sound.add('correct', { volume: 0.4 }).play();
                this.validatedCharacters.push(this.currentCharacter);
                this.remainingCharacters = this.remainingCharacters.filter(
                    c => c !== this.currentCharacter
                );
            }
            // son incorrect
            else {
                this.sound.add('incorrect', { volume: 0.9 }).play();
            }

            // Pause puis chargement du prochain perso
            this.time.delayedCall(1000, () => {
                resultText.destroy();
                this.enCours = false;
                this.loadNewCharacter();
            });
        };


        // bouton start
        const graphics = this.add.graphics();
        graphics.fillStyle(0xD9C667, 1);
        graphics.fillRoundedRect(440, 350, 170, 55, 25);

        this.timerButton = this.add.text(452, 360, "C'est parti !", {
            fill: 'white',
            backgroundColor: '#D9C667',
            fontSize: '32px',
            fontFamily: "dynapuff-condensed",
        }).setInteractive(); // Rends le texte cliquable

        this.started = false;

         // Fonction de démarrage du jeu
        const startGame = () => {
            // Empêche double clic
            if (this.started) return;
            this.started = true;
            // Lance le chrono
            monTimer.paused = false;
            // détruit le bouton
            if (this.timerButton) this.timerButton.destroy();
            if (graphics) graphics.destroy();
            this.loadNewCharacter();
        };

        // démarre le jeu
        this.timerButton.on('pointerdown', startGame); 
    }

    update() {
        // naviguer clavier haut et bas
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectedIndex = Phaser.Math.Clamp(this.selectedIndex - 1, 0, 2);
            this.highlightSelectedShadow();
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.selectedIndex = Phaser.Math.Clamp(this.selectedIndex + 1, 0, 2);
            this.highlightSelectedShadow();
        }

        // Validater clavier ENTER
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            if (!this.started && this.timerButton) {
                this.timerButton.emit('pointerdown');
            } else {
                this.validateSelection();
            }
        }

    }
}

console.log('level1');
