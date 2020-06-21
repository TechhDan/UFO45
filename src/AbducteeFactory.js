import Trump from './Abductees/Trump.js';
import Cow from './Abductees/Cow.js';
import {getRandomArbitrary} from './functions.js';

export default class AbducteeFactory {

  constructor(image) {
    this.image = image;
    this.createRandomAbductee();
  }

  createRandomAbductee() {
    let num = Math.random() * 100,
      x = getRandomArbitrary(window.UFO45.canvas.width, window.UFO45.canvas.width * 2);

    if (num <= 100) {
      this.abductee = new Cow(this.image, x);
    } else {
      this.abductee = new Trump(this.image, x);
    }
  }

  update(deltaTime) {
    this.abductee.update(deltaTime);

    if (this.abductee.x + this.abductee.width < 0) {
      delete this.abductee;
      this.createRandomAbductee();
    }

  }

}