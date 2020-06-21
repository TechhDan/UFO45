export default class Foreground {

  constructor(image) {
    this.speed = 1;
    this.image = image;
    this.width = window.UFO45.tileSize;
    this.height = window.UFO45.tileSize;
    this.x = 0;
    this.y = window.UFO45.canvas.height - this.width;
    this.numberOfTiles = Math.ceil(window.UFO45.canvas.width / window.UFO45.tileSize);

    this.animationFrameCount = 0;
    this.animationFrameCountThreshold = 20;
  }

  update(deltaTime) {
    for (let i = -1; i < this.numberOfTiles + 1; i++) {
      window.UFO45.context.drawImage(this.image,
        1 * this.width,
        0 * this.height,
        this.width, this.height,
        this.x + (i * this.width), 
        this.y,
        this.width, this.height
      );
    }
    this.updateAnimationThreshold();
    this.animate(deltaTime);
  }

  updateAnimationThreshold() {
    if (window.UFO45.player.x < window.UFO45.player.vecX) {
      this.animationFrameCountThreshold = 10;
    } else {
      this.animationFrameCountThreshold = 20;
    }
  }

  animate(deltaTime) {
    this.animationFrameCount += 1 * deltaTime;
    if (this.animationFrameCount < this.animationFrameCountThreshold) {
      return; 
    }
    this.animationFrameCount = 0;
    this.x++;
    if (this.x > this.width || this.x < -this.width) {
      this.x = 0;
    }
  }
}