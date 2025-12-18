class Hero extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y,) {
        super(scene, x, y, 'hero');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

    }

    preload ()
    {
    this.hero = this.add.image(200, 200, 'hero');

    }

    create ()
    {


    //       var playerX = 200;
    //       var playerY = 200;
    // this.hero = this.physics.add.sprite(playerX, playerY, 'hero');
    // this.hero.setCollideWorldBounds(true, 1, 1);

    //       var playerX = 200;
    //       var playerY = 200;
    // this.hero = this.physics.add.sprite(playerX, playerY, 'hero');
    // this.hero.setCollideWorldBounds(true, 1, 1);
    }
    update ()
    {

    }

}


export default Hero
