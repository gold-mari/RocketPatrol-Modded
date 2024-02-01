class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);                       // add to existing scene
        this.points = pointValue;                       // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;  // spaceship speed in pixels/frame
    }

    update()
    {
        // move left
        this.x -= this.moveSpeed;

        // wrap from left to right edge
        if (this.x <= -this.width)
        {
            this.x = game.config.width;
        }
    }

    reset()
    {
        // reset spaceship position
        this.x = game.config.width;
    }
}