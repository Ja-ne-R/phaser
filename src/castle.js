// "Every great game begins with a single scene. Let's make this one unforgettable!"
import Bullet from "/src/bullet.js"
import Hero from "/src/hero.js"


export class Castle extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'Castle' });
    }

    init() {
        // Initialize scene
    }

    preload() {
this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
this.SprintKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    create() {
        // game.scene.add('Main', Main, false);
let collisionGroup = this.physics.add.staticGroup();
var dungeonmap = this.make.tilemap({ key: 'dungeonmap'});
var dungeontiles = dungeonmap.addTilesetImage('Dungeon_Tileset', 'dungeontiles');
var voidLayer = dungeonmap.createLayer("DungeonVoid", dungeontiles, 0, 0);
var layer = dungeonmap.createLayer("Dungeon", dungeontiles, 0, 0);
var stuffLayer = dungeonmap.createLayer('DungeonStuff', dungeontiles, 0, 0);
this.camera = this.cameras.main;
this.hero = this.physics.add.existing(new Hero(this, 100, 100));
this.wand = this.add.image(this.hero.x, this.hero.y, 'wand');
this.cameras.main.startFollow(this.hero, true, 1, 1);
let objectLayer = dungeonmap.getObjectLayer( 'Collisions' );
let entranceLayer = dungeonmap.getObjectLayer('Entrance');
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
for( let obj of entranceLayer.objects ){
        
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
    this.scene.switch('World');
    this.hero.setX(100);
    this.hero.setY(100);
});
    }

    }
    update(){
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


    }
}
export default Castle
