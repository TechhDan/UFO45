import {collisionDetection, getRandomArbitrary} from './../functions.js';

export default class Cow {

  constructor(image, x) {
    this.image = image;
    this.width = window.UFO45.tileSize * 2;
    this.height = window.UFO45.tileSize;
    this.x = x;
    this.y = window.UFO45.canvas.height - this.height - window.UFO45.tileSize;
    this.currentAnimationFrame = 0;
    this.animationFrameCount = 0;
    this.animationFrameCountThreshold = 100;
    this.animationFrames = [
      {x: 0, y: 4},
      {x: 0, y: 5},
      {x: 0, y: 6},
      {x: 0, y: 7}
    ];
    this.speedAnimationFrameCount = 0;
    this.speedAnimationFrameCountThreshold = 50;
    this.beingAbducted = false;
    this.abductedResistance = 100;
    this.direction = 1;
  }

  update(deltaTime) {
    window.UFO45.context.drawImage(this.image,
      this.animationFrames[this.currentAnimationFrame].x * this.width,
      this.animationFrames[this.currentAnimationFrame].y * window.UFO45.tileSize,
      this.width, this.height,
      this.x,
      this.y,
      this.width, this.height
    );
    
    this.animate(deltaTime);
    this.move(deltaTime);
    this.collisionDetection(deltaTime);
  }

  animate(deltaTime) {
    this.animationFrameCount += 1 * deltaTime;
    if (this.animationFrameCount < this.animationFrameCountThreshold) {
      return; 
    }
    this.animationFrameCount = 0;
    this.currentAnimationFrame++;
    if (this.currentAnimationFrame >= this.animationFrames.length) {
      this.currentAnimationFrame = 0;
    }
  }

  move(deltaTime) {
    if (this.abductedResistance < 0) {
      this.y--;
      this.x += this.direction;
      if (this.x + this.width > window.UFO45.canvas.width) {
        this.direction *= -1;
      }
    }
    this.speedAnimationFrameCount += 1 * deltaTime;
    if (this.speedAnimationFrameCount < this.speedAnimationFrameCountThreshold) {
      return; 
    }
    this.speedAnimationFrameCount = 0;
    this.x--;
  }

  collisionDetection(deltaTime) {
    switch (window.UFO45.tileSize) {
      case 48:
        this.collisionBox = {
          x: this.x + 10,
          y: this.y + 1,
          width: this.width - 18,
          height: this.height
        };
        break;
    }
    if (window.UFO45.debug) {
      window.UFO45.context.strokeStyle = "red";
      window.UFO45.context.beginPath();
      window.UFO45.context.rect(
        this.collisionBox.x,
        this.collisionBox.y,
        this.collisionBox.width,
        this.collisionBox.height
      );
      window.UFO45.context.stroke();
    }
    if (collisionDetection(this.collisionBox, window.UFO45.player.ray)) {
      this.beingAbducted = true;
      this.abductedResistance--;

      // Add static effect
      let imgData = window.UFO45.context.getImageData(
        this.collisionBox.x,
        this.collisionBox.y,
        this.collisionBox.width,
        this.collisionBox.height
      ), i;
      for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = getRandomArbitrary(0, 255)-imgData.data[i];
        imgData.data[i + 1] = getRandomArbitrary(150, 255)-imgData.data[i + 1];
        imgData.data[i + 2] = getRandomArbitrary(255, 255)-imgData.data[i + 2];
        imgData.data[i + 3] = 255;
      }
      window.UFO45.context.putImageData(imgData, this.collisionBox.x, this.collisionBox.y);
    } else {
      this.beingAbducted = false;
    }

    if (this.abductedResistance < 0) {
      window.UFO45.CloudEnemies.enemies.forEach(enemy => {
        if (collisionDetection(this.collisionBox, enemy)) {
          enemy.x = - enemy.width;
          this.direction *= -1;
        }
      });
    }
  }

}