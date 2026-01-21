// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    init() {
        // Initialize scene
    }

    preload() {
        
  this.load.image('dungeontiles', 'assets/Dungeon_Tileset.png');
  this.load.image('hero', 'assets/lilhero.png');
  this.load.image('bullet', 'assets/star.png');
  this.load.image('enemy', 'assets/skull.png');
  this.load.tilemapTiledJSON('dungeonmap', 'assets/dungeon_map.json');
  this.load.image('wand', 'assets/wand.png');
  this.load.image('tiles', 'assets/tileset.png');
this.load.tilemapTiledJSON('map', 'assets/map.json');
    }

    create() {
       this.scene.start('World');
    }

}
export default Boot