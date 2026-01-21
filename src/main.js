import Bullet from "/src/bullet.js"
import Hero from "/src/hero.js"
import Castle from "/src/castle.js"
import World from "/src/world.js"
import Boot from "/src/boot.js"
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#2d3436',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
scene: [ Boot, World, Castle ]
};



new Phaser.Game(config);
