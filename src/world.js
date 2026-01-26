// "Every great game begins with a single scene. Let's make this one unforgettable!"

import Bullet from "/src/bullet.js"
import Hero from "/src/hero.js"
import Castle from "/src/castle.js"
import Enemy from "/src/enemy.js"
export class World extends Phaser.Scene {
    constructor() {
        super('World');
        this.pickupChickens = null;
        this.chickenCount = 0;
    }



preload() {

this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
this.SprintKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

var cooldown = false;

}


create() {
    this.chickenCount = 0;

  this.pickupChickens = this.add.group();

this.camera = this.cameras.main;
var map = this.make.tilemap({ key: 'map'});
var tiles = map.addTilesetImage('tileset', 'tiles');
var layer = map.createLayer("Ground", tiles, 0, 0);
var fillerLayer = map.createLayer('Filler', tiles, 0, 0);
var treeLayer = map.createLayer('Trees', tiles, 0, 0);
var stuffLayer = map.createLayer('Stuff', tiles, 0, 0);
var castleEntranceLayer = map.getObjectLayer('CastleEntrance');
this.hero = this.physics.add.existing(new Hero(this, 100, 100));
this.wand = this.add.image(this.hero.x, this.hero.y, 'wand');

this.cameras.main.startFollow(this.hero, true, 1, 1);
        let helpText = this.add.text(40, 30, 'Scene 1\nUse WASD to move the player')
            .setOrigin(0)
setTimeout(() => {
  console.log("this is the first message");
  helpText.destroy();
}, 5000);
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
    this.scene.switch('Castle');
    console.log(this.hero.x);
    console.log(this.hero.y);
    this.hero.setY(1400);
});
    }

this.bullets = this.physics.add.group({
    classType: Bullet,
    runsChildUpdate: true
});

this.shoot = this.sound.add('shoot');
this.peck = this.sound.add('peck');


this.input.on('pointerdown', pointer => {
    this.shoot.play();
    const activePointer = this.input.activePointer;
    const lockedToCamPointer = activePointer.positionToCamera(this.cameras.main);
    const bullet = this.bullets.get(this.hero.x, this.hero.y);
    
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setInteractive();
        bullet.enableBody = true;
        bullet.onOverlap = true;
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


//chickens
this.chickens = this.physics.add.group({
    maxSize: 10,
    collideWorldBounds: true,
    maxSpeed: 20,
    health: 1
})
for (var i = 0; i < 10; i++) {

let ranchiX = Phaser.Math.Between(50, 1500);
let ranchiY = Phaser.Math.Between(50, 1500);
const chicken = this.physics.add.sprite(ranchiX, ranchiY, 'chicken');
    chicken.enableBody = true;
    chicken.body.onCollide = true;
    chicken.setCollideWorldBounds(true);
    chicken.setBounce(1); // Optional: makes it bounce off walls


    // Set up the random movement timer
    this.time.addEvent({
        delay: 1500, // Change direction every 1.5 seconds
        loop: true,
        callback: () => {
            const speed = 40;
            const directions = [
                { x: speed, y: 0, type: 'walk'},
                { x: -speed, y: 0, type: 'walk' },
                { x: 0, y: speed, type: 'walk' },
                { x: 0, y: -speed, type: 'walk' },
                { x: 0, y: 0, type: 'peck' } // Chance to stop and peck

            ];
            
            const move = Phaser.Math.RND.pick(directions);
            if (chicken.active) {chicken.setVelocity(move.x, move.y);
            if (move.type === 'peck'){
                this.peck.play();
            }
            // Flip the sprite based on horizontal direction
            if (move.x > 0) chicken.setFlipX(true);
            else if (move.x < 0) chicken.setFlipX(false);
        }
        }
    });
this.physics.add.overlap(chicken, this.bullets, handleBulletAndChickenCollision, undefined, this); 
this.physics.add.collider(chicken, collisionGroup); 
function handleBulletAndChickenCollision(chicken, bullet){
    this.chickenCount += 1;
    console.log("test");
    chicken.destroy();
   let pickupChicken = this.physics.add.sprite(chicken.x, chicken.y, 'chicken');
   pickupChicken.setFlipY(true);
   this.pickupChickens.add(pickupChicken);
   console.log(this.pickupChickens.children);

    // this.tweens.add({
    //     targets: pickupChicken,
    //     x: this.hero.x,
    //     y: this.hero.y,
    //     duration: 1000,
    //     ease: 'Power2',
    //     onComplete: () => {
    //         console.log(pickupChicken);
    //         pickupChicken.destroy();
    //     }
    // });
}

}
// Add overlap detection for bullets and chickens




}

// move speed and movement controls





update(time, delta) {


this.pickupChickens.children.each((pickupChicken) => {
        let directionX = this.hero.x - pickupChicken.x;
        let directionY = this.hero.y - pickupChicken.y;
        let length = Math.sqrt(directionX * directionX + directionY * directionY);

        if (length > 0) {
            directionX /= length;
            directionY /= length;

            // Move pickupChicken towards the hero
            let speed = 100; // Adjust speed as necessary
            pickupChicken.setVelocity(directionX * speed, directionY * speed);
        }
        this.physics.add.overlap (pickupChicken, this.hero, (hero, collisionObject) => {
    console.log("yes");
    pickupChicken.destroy();
    this.chickenCount += 1;

    console.log(this.chickenCount);

});

    });

const heroX = this.hero.x;
    const heroY = this.hero.y;


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
    if (this.SprintKey.isDown){
    this.hero.speed = 350;
    }
    else{
        this.hero.speed = 200;
    }

var cooldown = false;


if (this.SpaceKey.isDown && !cooldown){
cooldown = true;

var cir = this.add.circle(this.hero.x, this.hero.y, 10, 0x5F2F49);



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

if (this.SpaceKey.isDown){
    console.log(this.pickupChickens);
}

    
        
        
        


}


}
export default World