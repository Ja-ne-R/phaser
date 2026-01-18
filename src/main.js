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
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var enemies;
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
  this.load.audio('shoot', 'assets/shoot-wav');
  this.load.image('tiles', 'assets/tileset.png');
  this.load.image('hero', 'assets/lilhero.png');
  this.load.image('bullet', 'assets/star.png');
  this.load.image('enemy', 'assets/skull.png');
  this.load.tilemapTiledJSON('map', 'assets/map.json');
  this.load.image('wand', 'assets/wand.png');
}
var cooldown = false;

function create() {
this.camera = this.cameras.main;
var map = this.make.tilemap({ key: 'map'});
var tiles = map.addTilesetImage('tileset', 'tiles');
var layer = map.createLayer("Ground", tiles, 0, 0);
var fillerLayer = map.createLayer('Filler', tiles, 0, 0);
var treeLayer = map.createLayer('Trees', tiles, 0, 0);
var stuffLayer = map.createLayer('Stuff', tiles, 0, 0);
var castleEntranceLayer = map.getObjectLayer('Castle_entrance');
this.hero = this.physics.add.existing(new Hero(this, 100, 100));
this.wand = this.add.image(this.hero.x, this.hero.y, 'wand');
this.cameras.main.startFollow(this.hero, true, 1, 1);

// treeLayer.forEachTile(function(tile) { if(tile.canCollide) { collisionGroup.push(tile); } });
let collisionGroup = this.physics.add.staticGroup();
let objectLayer = map.getObjectLayer( 'Collisions' );

    for( let obj of objectLayer.objects ){
        
        // since you are not displaying the object the shape doesn't matter, only the collision body
   let gameObject = this.add.rectangle(obj.x, obj.y, obj.width, obj.height)
    .setOrigin(0);
collisionGroup.add(gameObject);
        this.physics.add.existing( gameObject, true );
        
        if(obj.ellipse){
           // For the ellipse version you would need to change the body
            gameObject.body.setCircle( obj.width / 2 );
        } else if(obj.point){
            // For the point we need no set an width and height
            gameObject.body.setSize( 4, 4 );
        }
        
        this.physics.add.collider( this.hero, gameObject );
    }

for( let obj of castleEntranceLayer.objects ){
        
        // since you are not displaying the object the shape doesn't matter, only the collision body
   let gameObject = this.add.rectangle(obj.x, obj.y, obj.width, obj.height)
    .setOrigin(0);
collisionGroup.add(gameObject);
        this.physics.add.existing( gameObject, true );
        
        if(obj.ellipse){
           // For the ellipse version you would need to change the body
            gameObject.body.setCircle( obj.width / 2 );
        } else if(obj.point){
            // For the point we need no set an width and height
            gameObject.body.setSize( 4, 4 );
        }
        
        this.physics.add.overlap(this.hero, gameObject, (hero, collisionObject) => {
    console.log("hello");
    this.scene.start('Castle');
});
    }

this.bullets = this.physics.add.group({
    classType: Bullet,
    runsChildUpdate: true
});



//enemies


    // this.enemies = this.physics.add.group({
    //     classType: Enemy,
    //     maxSize: 10
    // });

    // for (var i = 0; i < 10; i++) {
    //     var eSpawnX = Phaser.Math.Between(200, 600);
    //     var eSpawnY = Phaser.Math.Between(200, 600);
        
    //     const enemy = this.enemies.get(eSpawnX, eSpawnY);

    //     if (enemy) {
    //         enemy.setActive(true);
    //         enemy.setVisible(true);

    //         // You can also set an initial velocity if needed
    //     }
    // }


// console.log(this.enemies.getChildren());
// this.enemy = this.physics.add.existing(new Enemy(this, eSpawnX, eSpawnY));
this.input.on('pointerdown', pointer => {
    const activePointer = this.input.activePointer;
    const lockedToCamPointer = activePointer.positionToCamera(this.cameras.main);
    const bullet = this.bullets.get(this.hero.x, this.hero.y);
    
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate shooting vector and set bullet speed
        let vector = new Phaser.Math.Vector2(lockedToCamPointer.x - this.hero.x, lockedToCamPointer.y - this.hero.y);
        vector.setLength(bullet.shootspeed);
        
        bullet.body.setVelocity(vector.x, vector.y);
        
        // Optional: Set rotation if needed
        bullet.rotation = Phaser.Math.Angle.Between(this.hero.x, this.hero.y, lockedToCamPointer.x, lockedToCamPointer.y);
    }
});

this.physics.add.collider(this.bullets, collisionGroup, (bullet, collisionObject) => {
    // Optional: Run effects here before destroying
    bullet.destroy(); // Remove bullet on collision
});

//test





// function increaseSpeed(){
// if (yes == true && enemySpeed <= 500){

// setTimeout(() => {
// enemySpeed += 20;
// console.log("speed increased" + enemySpeed);
// increaseSpeed()
// }, 3000);
// }


// }

// increaseSpeed();
}

// move speed and movement controls
var speed = 8;



function update(time, delta) {
const heroX = this.hero.x;
    const heroY = this.hero.y;

    // this.enemies.getChildren().forEach(enemy => {
    //     if (enemy.active) { // Check if the enemy is active
    //         const enemyX = enemy.x;
    //         const enemyY = enemy.y;
    //         const directionX = heroX - enemyX;
    //         const directionY = heroY - enemyY;
    //         const distance = Math.sqrt(directionX * directionX + directionY * directionY);

    //         if (distance > 0) {
    //             const speed = enemySpeed || 100;
    //             enemy.setVelocity(
    //                 (directionX / distance) * speed,
    //                 (directionY / distance) * speed
    //             );
    //         } else {
    //             enemy.setVelocity(0, 0);
    //         }
    //     }
    // });
  // Runs once per frame for the duration of the scene


// movement

    if (this.DKey.isDown) {
        this.hero.setVelocityX(this.hero.speed);
        this.wand.setX(this.hero.x);
    } else if (this.AKey.isDown) {
        this.hero.setVelocityX(-this.hero.speed);
        this.wand.setX(this.hero.x);
    } else {
        this.hero.setVelocityX(0); // Stops movement if no key is pressed
    }

    if (this.WKey.isDown) {
        this.hero.setVelocityY(-this.hero.speed);
        this.wand.setY(this.hero.y);
    } else if (this.SKey.isDown) {
        this.hero.setVelocityY(this.hero.speed);
        this.wand.setY(this.hero.y);
    } else {
        this.hero.setVelocityY(0); // Stops movement

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
//   const tx = this.hero.x;
//   const ty = this.hero.y;

//   const ex = this.enemy.x;
//   const ey = this.enemy.y;

//   this.physics.moveToObject(this.enemy, this.hero, enemySpeed);

  
//   const rotation = Phaser.Math.Angle.Between(ex, ey, tx, ty)

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
            