import {getRandomArbitrary} from './functions.js';

export default class Background {

  constructor(image) {
    this.day = false;
    this.canvas = window.UFO45.canvas;
    this.lastUpdate = 0;
    this.createStars();
  }


  update(deltaTime) {
    const score = Math.floor(window.UFO45.score.score);
    if (score > 1 && score % 60 === 0 && score > this.lastUpdate) {
      this.canvas.style.background = this.day ? "#29adff" : "#1d2b53";
      this.day = !this.day;
      this.lastUpdate = score;
    }
    this.stars.forEach(star => star.update(deltaTime));
  }

  createStars() {
    this.stars = [];
    const numberOfStars = (window.UFO45.canvas.width * window.UFO45.canvas.height) / 400;
    for (let i = 0; i < numberOfStars; i++) {
      this.stars.push(new Star());
    }
  }

}

class Star {

  constructor() {
    this.x = getRandomArbitrary(0, window.UFO45.canvas.width * 1.5);
    this.y = getRandomArbitrary(0, window.UFO45.canvas.height - window.UFO45.tileSize);
    this.width = 1;
    this.height = 1;
  }

  randomizeCoordinates() {
    this.x = getRandomArbitrary(window.UFO45.canvas.width, window.UFO45.canvas.width * 2);
    this.y = getRandomArbitrary(0, window.UFO45.canvas.height - window.UFO45.tileSize);
  }

  update(deltaTime) {
    if (!window.UFO45.background.day) {
      return;
    }
    window.UFO45.context.fillStyle = "white";
    window.UFO45.context.fillRect(this.x, this.y, this.width, this.height);
    this.x--;
    if (this.x + this.width < 0) {
      this.randomizeCoordinates();
    }
  }

}