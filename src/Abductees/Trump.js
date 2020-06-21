export default class Trump {

  constructor(image, x) {
    this.image = image;
    this.width = window.UFO45.tileSize;
    this.height = window.UFO45.tileSize * 2;
    this.x = x;
    this.y = window.UFO45.canvas.height - this.height - window.UFO45.tileSize;
    this.currentAnimationFrame = 0;
    this.animationFrameCount = 0;
    this.animationFrameCountThreshold = 100;
    this.animationFrames = [
      {x: 4, y: 3},
      {x: 5, y: 3},
      {x: 6, y: 3},
      {x: 7, y: 3}
    ];
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
    this.x--;
    this.animate(deltaTime);
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

}