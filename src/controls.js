

export default class Controls extends Phaser.Scene {
    constructor() {
        super('Controls');
    }

    preload(){

    };
    create() {
this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
this.SprintKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);


};

    
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

