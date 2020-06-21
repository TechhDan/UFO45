import {getRandomArbitraryFloat, getRandomArbitrary} from './functions.js';

export default class Bushes {

  constructor(image, x) {
    this.speed = 2;
    this.image = image;
    this.width = window.UFO45.tileSize * 2;
    this.height = window.UFO45.tileSize;
    this.x = x;
    this.y = window.UFO45.canvas.height - this.height * 2;
  }

  update() {
    if (window.UFO45.player.vector[0].x > 0) {
      this.speed = 3;
    } else {
      this.speed = 2;
    }

    window.UFO45.context.drawImage(this.image,
      5 * window.UFO45.tileSize,
      5 * window.UFO45.tileSize,
      this.width, this.height,
      this.x,
      this.y,
      this.width, this.height
    );
    this.x -= this.speed;

    if (this.x < -this.width) {
      this.x = getRandomArbitrary(window.UFO45.canvas.width, window.UFO45.canvas.width * 2);
    }
  }
 
}