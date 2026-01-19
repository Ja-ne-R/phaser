// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class Castle extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'Castle' });
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
    }

    create() {
this.camera = this.cameras.main;
var dungeonmap = this.make.tilemap({ key: 'dungeonmap'});
var dungeontiles = dungeonmap.addTilesetImage('Dungeon_Tileset', 'dungeontiles');
var layer = dungeonmap.createLayer("Dungeon", dungeontiles, 0, 0);

        this.add.text(10, 10, 'Scene 1\nUse WASD to move the "player"')
            .setOrigin(0)
    }

}
export default Castle
