class Menu extends Phaser.Scene {
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        // load images / tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("speedyship", "./assets/speedyship.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("planets", "./assets/planets.png");
        // load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png",
        {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        // load SFX
        this.load.audio("sfx-select", "./assets/sfx-select.wav");
        this.load.audio("sfx-explosion1", "./assets/sfx-explosion1.wav");
        this.load.audio("sfx-explosion2", "./assets/sfx-explosion2.wav");
        this.load.audio("sfx-explosion3", "./assets/sfx-explosion3.wav");
        this.load.audio("sfx-explosion4", "./assets/sfx-explosion4.wav");
        this.load.audio("sfx-shot", "./assets/sfx-shot.wav");
    }

    create()
    {
        this.anims.create(
        {
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        let menuConfig = 
        {
            fontFamily: "Courier",
            fortSize: "28px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "right",
            padding: 
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu        
        this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding,
                      "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
                      "USE <- -> arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00ff00";
        menuConfig.color = "#000";
        this.add.text(game.config.width/2, game.config.height/2+borderUISize+borderPadding, 
                      "Press <- for Novice or -> for Expert", menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            // easy mode
            game.settings = 
            {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                timeLostOnMiss: 1000,   // 1 second
                timeGainOnHit: 2000,    // 2 seconds
                speedyshipMultiplier: 1.5
            }
            this.sound.play("sfx-select");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            // easy mode
            game.settings = 
            {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                timeLostOnMiss: 2000,   // 2 seconds
                timeGainOnHit: 1000,    // 1 second
                speedyshipMultiplier: 2
            }
            this.sound.play("sfx-select");
            this.scene.start("playScene");
        }
    }
}