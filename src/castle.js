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
        // Load assets
    }

    create() {
        super.create();
        this.add.text(10, 10, 'Scene 1\nUse WASD to move the "player"')
            .setOrigin(0)
    }

}

