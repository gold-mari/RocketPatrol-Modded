// CMPM 120, Winter 2024
// Dylan Mahler
// [Mod name here]
// 
// Mod list:
//      X 5: Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses
//      X 3: Display the time remaining (in seconds) on the screen
//      X 3: Implement parallax scrolling for the background
//      X 3: Create 4 new explosion sound effects and randomize which one plays on impact
//      X 1: Create a new scrolling tile sprite for the background

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT