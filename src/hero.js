class Hero extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y,) {
        super(scene, x, y, 'hero');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.health = 1;

    }

    preload ()
    {
    this.hero = this.add.image(200, 200, 'hero');

    }

    create ()
    {

    }
    update ()
    {

    }

}


export default Hero
