
import Hero from "/src/hero.js"
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#2d3436',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var star;
var playerX = 200;
var playerY = 200;
const game = new Phaser.Game(config);
var dir;
var starDir;

function preload() {
this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  this.load.image('tiles', 'assets/tileset.png');
        this.load.image('hero', 'assets/lilhero.png');
  this.load.image('star', "assets/star.png");
  
  // Runs once, loads up assets like images and audio
  //   this.load.image('tiles', 'assets/spritesheet.png');
  // this.load.text('map', 'assets/map.json');


}
var cooldown = false;
var starX;
var starY;
function create() {


  const array =[   
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 43, 1, 1, 12, 13, 14, 1, 1, 43, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 43, 1, 1, 24, 25, 26, 1, 1, 1, 2, 1, 2, 2, 43, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 36, 37, 38, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
   [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 12, 13, 13, 13, 13, 13, 13, 13, 14, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 43, 1, 1, 1, 24, 25, 25, 25, 25, 25, 25, 25, 26, 1, 1, 1, 1, 1],
   [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 24, 25, 25, 25, 25, 25, 25, 25, 26, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 24, 25, 25, 25, 25, 25, 25, 25, 26, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 43, 1, 1, 1, 1, 1, 1, 1, 1, 1, 24, 25, 25, 25, 25, 25, 25, 25, 26, 2, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 36, 37, 37, 37, 37, 37, 37, 37, 38, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1],
   [1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
  const map = this.make.tilemap({ data:array, tileWidth: 32, tileHeight: 32})
  map.addTilesetImage("tiles");
  const layer = map.createLayer(0, "tiles", 0, 0);



  // Runs once, after all assets in preload are loaded
  // const map = this.make.tilemap({   key: "map"})
  // const tileset = map.addTilesetImage("map", "tiles");
  // const layer = map.createLayer(0, tileset, 0, 0);
  // this.map = JSON.parse(this.game.cache.getText('map'));

this.hero = this.physics.add.existing(new Hero(this, 100, 100));

//bullets

this.input.on('pointerdown', pointer => {
          let shootspeed = 300;
          
          // create bullet
this.star = this.physics.add.sprite(this.hero.x, this.hero.y, 'star')
          this.physics.add.existing(this.star);
          
          // get Vector where to shoot bullet
          let vector = new Phaser.Math.Vector2( pointer.x - this.hero.x, pointer.y - this.hero.y );
           
          // set Speed of bullet 
          vector.setLength(shootspeed);
          
          // DEMO: to shoot in a straightline, just comment the following line in

          
          // DEMO: QuickFix to destroy the bullet after 1 Second automatically
          // setTimeout( () => bullet.destroy(), 1000);
          
          // add bullet to group

          
          this.star.body.setVelocity(vector.x, vector.y);
      });


}


// move speed and movement controls
var speed = 8;
function update(time, delta) {
  // Runs once per frame for the duration of the scene

        
// movement
if (this.DKey.isDown && this.SKey.isDown){
  this.hero.x += speed; 
  this.hero.y += speed; 
  dir = "x+y+";
}
else if (this.AKey.isDown && this.SKey.isDown){
  this.hero.x -= speed;
  this.hero.y += speed;
  dir = "x-y+";
}
else if (this.WKey.isDown && this.AKey.isDown){
  this.hero.x -= speed;
  this.hero.y -= speed;
  dir = "x-y-";
}
else if (this.WKey.isDown && this.DKey.isDown){
  this.hero.x += speed;
  this.hero.y -= speed;
  dir = "x+y-";
}
else if (this.DKey.isDown){
  this.hero.x += speed;
  dir = "x+";
}
else if (this.AKey.isDown){
  this.hero.x -= speed;
  dir = "x-";
}
else if (this.WKey.isDown){
  this.hero.y -= speed;
  dir = "y-";
}
else if (this.SKey.isDown){
  this.hero.y += speed;
  dir = "y+";
}


if (this.SpaceKey.isDown && !cooldown){
var cir = this.add.circle(this.hero.x, this.hero.y, 50, 0x9966ff);
console.log(dir);
cooldown = true;
starDir = dir;
        this.tweens.add({

            targets: cir,
            scaleX: 0.20,
            scaleY: 0.20,
            yoyo: true,
            repeat: 1,
            ease: 'Sine.easeInOut'

        });
setTimeout(() => {
  cooldown = false;
  cir.destroy();
}, 3000);
}

//bullets


}

new Phaser.Game(config);
            