import {getRandomArbitrary} from './functions.js';

export default class Bushes {

  constructor(image) {
    this.image = image;
    this.width = window.UFO45.tileSize * 10;
    this.height = window.UFO45.tileSize * 5;
    this.x = window.UFO45.canvas.width;
    this.y = window.UFO45.canvas.height -
      this.height - window.UFO45.tileSize;
  }

  update() {
    window.UFO45.context.drawImage(
      this.image,
      8 * window.UFO45.tileSize,
      0,
      this.width, this.height,
      this.x,
      this.y,
      this.width, this.height
    );
    this.x--;
  }

}