class Enemy extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y,) {
        super(scene, x, y, 'enemy');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.health = 1;
        this.attack = 1;
        this.speed = 5;

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


export default Enemy
