

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



};

    
    update(){
    if (this.WKey.isDown && this.AKey.isDown)
        {
            this.hero.y -= speed;
            this.hero.x -= speed;
        }
        else if(this.SKey.isDown && this.AKey.isDown)
        {
            this.hero.y += speed;
            this.hero.x -= speed;
        }
        else if (this.DKey.isDown && this.WKey.isDown)
        {
            this.hero.x += speed;
            this.hero.y -= speed;
        }
        else if (this.SKey.isDown && this.DKey.isDown)
        {
            this.hero.x += speed;
            this.hero.y += speed;
        }
        else if (this.WKey.isDown){
          this.hero.y -= speed;
          dir = "up";
          console.log(dir);
        }
        else if (this.SKey.isDown){
          this.hero.y += speed;
          dir = "down";
          console.log(dir);          
        }
        else if (this.DKey.isDown){
          this.hero.x += speed;
          dir = "right";
          console.log(dir);          
        }
        else if (this.AKey.isDown){
          this.hero.x -= speed;
          dir = "left";
          console.log(dir);          
        }


}
}