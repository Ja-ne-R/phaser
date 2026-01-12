class Bullet extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y,) {
        super(scene, x, y, 'bullet');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.power = 1;
        this.shootspeed = 300;
        this.setCollideWorldBounds(true);
    }

    preload ()
    {


    }

    create ()
    {

    }
    update ()
    {

    }

}


export default Bullet
