class Play extends Phaser.Scene {
    constructor()
    {
        super("playScene");
    }

    create()
    {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.planets = this.add.tileSprite(0, 0, 640, 480, 'planets').setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x00ff00).setOrigin(0, 0);

        // white borders: top, bottom, left, right
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0);

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // create rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-borderPadding, "rocket").setOrigin(0.5, 0);

        // add 3 spaceships!
        this.ship01 = new Spaceship(this, game.config.width+borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width+borderUISize*3, borderUISize*5+borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, (borderUISize*6)+(borderPadding*4), 'spaceship', 0, 10).setOrigin(0,0);

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = 
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
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize+borderPadding, borderUISize+(borderPadding*2), this.p1Score, scoreConfig);

        // Game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>
        {
            this.add.text(game.config.width/2, game.config.height/2, 
                          "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+64, 
                          "Press (R) to Restart or <- for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // initialize time remaining
        this.timeRemaining = game.settings.gameTimer/1000;
        // display time remaining
        this.timeRight = this.add.text(game.config.width-borderUISize-(borderPadding*4), borderUISize+(borderPadding*2), this.timeRemaining, scoreConfig);
    }

    update()
    {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) 
        {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) 
        {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        this.planets.tilePositionX -= 0.5;

        if (!this.gameOver)
        {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // Collision checking!
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        // update time remaining
        this.timeRemaining = (game.settings.gameTimer-this.clock.elapsed)/1000;
        this.timeRight.text = Math.floor(this.timeRemaining).toString().padStart(3, '0');
    }

    checkCollision(rocket, ship)
    {
        // Axis-Aligned Bounding Box (AABB) check

        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y)
        {
            return true;
        }

        else return false;
    }

    shipExplode(ship) 
    {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");             // play explode animation
        boom.on("animationcomplete", () =>      // callback after anim completes
        {    
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        })       
        // update score!
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // update time!
        this.clock.elapsed -= game.settings.timeGainOnHit;
        // play SFX
        this.playExplodeSFX();
    }

    shipMiss()
    {
        // called from rocket when we don't hit any ships.
        this.clock.elapsed += game.settings.timeLostOnMiss;
    }

    playExplodeSFX()
    {
        let rng = Math.floor(Math.random() * 65);
        if (rng < 20) this.sound.play("sfx-explosion1");
        else if (rng < 40) this.sound.play("sfx-explosion2");
        else if (rng < 60) this.sound.play("sfx-explosion3");
        else this.sound.play("sfx-explosion4");
    }
}