// CMPM 120, Winter 2024
// Dylan Mahler
// Rocket Patrol: Revengeance of the Speedyships
// 
// Mod list:
//      X 5: Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
//      X 5: Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses
//      X 3: Display the time remaining (in seconds) on the screen
//      X 3: Implement parallax scrolling for the background
//      X 3: Create 4 new explosion sound effects and randomize which one plays on impact
//      X 1: Create a new scrolling tile sprite for the background
//
// Estimated time:
//      I estimate I completed this assignment start-to-end in roughly 2 hours.
//
// Citations:
//      Credit to user spkrtn on stackoverflow for describing the usage of the padStart function to pad zeros to a number.
//      https://stackoverflow.com/questions/1127905/how-can-i-format-an-integer-to-a-specific-length-in-javascript

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