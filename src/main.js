import Bullet from "/src/bullet.js"
import Hero from "/src/hero.js"
import Enemy from "/src/enemy.js"
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
var yes = true;
var enemySpeed = false;
var vector;
function preload() {
this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  this.load.image('tiles', 'assets/tileset.png');
  this.load.image('hero', 'assets/lilhero.png');
  this.load.image('bullet', 'assets/star.png');
  this.load.image('enemy', 'assets/skull.png');
  
  // Runs once, loads up assets like images and audio
  //   this.load.image('tiles', 'assets/spritesheet.png');
  // this.load.text('map', 'assets/map.json');


}
var cooldown = false;
var starX;
var starY;


var eSpawnX = Phaser.Math.Between(-200, 1600);
var eSpawnY = Phaser.Math.Between(-300, 0);
function create() {



  const array =[   
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
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
this.hero.setDepth(8);
this.hero.setCollideWorldBounds(true, 1, 1);
//bullets
for (var i = 0; i < 10; i++)
{
    let enemy = new Enemy(this, this.eSpawnX, this.eSpawnY, 'enemy');
    this.physics.add.existing(enemy);
}
this.input.on('pointerdown', pointer => {
var curX = this.hero.x;
var curY = this.hero.y;

          
          // create bullet
this.bullet = this.physics.add.existing(new Bullet(this, curX, curY));
          
          // get Vector where to shoot bullet
          let vector = new Phaser.Math.Vector2( pointer.x - this.hero.x, pointer.y - this.hero.y );
           
          // set Speed of bullet 
          vector.setLength(this.bullet.shootspeed);

          // DEMO: to shoot in a straightline, just comment the following line in

          
          // DEMO: QuickFix to destroy the bullet after 1 Second automatically
          // setTimeout( () => bullet.destroy(), 1000);
          
          // add bullet to group

          
          this.bullet.body.setVelocity(vector.x, vector.y);

      });

//test



this.enemy = this.physics.add.existing(new Enemy(this, eSpawnX, eSpawnY));

function increaseSpeed(){
if (yes == true && enemySpeed <= 500){

setTimeout(() => {
enemySpeed += 20;
console.log("speed increased" + enemySpeed);
increaseSpeed()
}, 3000);
}


}
increaseSpeed();
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
  console.log(this.enemy.x);
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


var cir = this.add.circle(this.hero.x, this.hero.y, 10, 0x5F2F49);

cooldown = true;

        this.tweens.add({

            targets: cir,
            scaleX: 7,
            scaleY: 7,
            yoyo: true,
            repeat: 1,
            ease: 'Sine.easeIn'

        });
setTimeout(() => {
  cooldown = false;
  cir.destroy();

}, 1000);
}

//enemy
  const tx = this.hero.x;
  const ty = this.hero.y;

  const ex = this.enemy.x;
  const ey = this.enemy.y;

  this.physics.moveToObject(this.enemy, this.hero, enemySpeed);

  
  const rotation = Phaser.Math.Angle.Between(ex, ey, tx, ty)

// if (yes == true){
// yes = false;

//   setTimeout(() => {
//   console.log("Delayed for 1 second.");
// this.enemy = this.physics.add.existing(new Enemy(this, eSpawnX, eSpawnY));
//   this.physics.moveToObject(this.enemy, this.hero, enemySpeed);

// }, 5000);
// }



}




new Phaser.Game(config);
            