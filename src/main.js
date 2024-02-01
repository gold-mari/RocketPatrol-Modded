// CMPM 120, Winter 2024
// Dylan Mahler
// [Mod name here]
// 
// Mod list:
//      X 3: Create 4 new explosion sound effects and randomize which one plays on impact
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT