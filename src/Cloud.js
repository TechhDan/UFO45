import {getRandomArbitraryFloat, getRandomArbitrary, collisionDetection} from './functions.js';

export default class CloudEnemies {

  constructor(image) {
    this.image = image;
    this.topNumberOfEnemies = 
      (Math.ceil((window.UFO45.canvas.height - (window.UFO45.tileSize * 3)) / window.UFO45.tileSize) *
      Math.ceil(window.UFO45.canvas.width / window.UFO45.tileSize)) / 4;
    this.secondsUntilNextEnemy = Math.ceil(200 / this.topNumberOfEnemies);
    this.enemies = [];
    this.enemies.push(new Cloud(image, 0));
  }

  update(deltaTime) {
    const score = Math.floor(window.UFO45.score.score);
    if (
      score % this.secondsUntilNextEnemy == 0 &&
      this.enemies.length <= score / this.secondsUntilNextEnemy &&
      this.enemies.length <= this.topNumberOfEnemies
    ) {
      this.enemies.push(new Cloud(this.image, this.enemies.length));
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime));
  }

}

class Cloud {

  constructor(image, index) {
    this.speed = 1;
    this.image = image;
    this.width = window.UFO45.tileSize;
    this.height = window.UFO45.tileSize;
    this.currentAnimationFrame = 0;
    this.animationFrameCount = 0;
    this.animationFrameCountThreshold = 300;
    this.animationFrames = [
      {x: 2, y: 4},
      {x: 2, y: 5},
      {x: 2, y: 6},
      {x: 2, y: 7},
      {x: 3, y: 4},
      {x: 3, y: 5},
      {x: 3, y: 6}
    ];
    this.currentAnimation = getRandomArbitrary(1, 10) > 6 ? 'rain' : 'default';
    this.globalAlpha = getRandomArbitraryFloat(.3, .8);
    this.randomizeCoordinates();
    this.createRainDrops();
  }

  randomizeCoordinates() {
    this.x = getRandomArbitrary(window.UFO45.canvas.width, window.UFO45.canvas.width * 2);
    this.y = getRandomArbitrary(0, window.UFO45.canvas.height - (window.UFO45.tileSize * 3));
  }

  createRainDrops() {
    if (this.currentAnimation != 'rain') {
      return;
    }
    this.rainDrops = [];
    for (let i = 0; i < this.width; i++) {
      for (let ii = 0; ii < this.height * 2; ii++) {
        if (i % 5 == 0 && ii % 10 == 0) {
          this.rainDrops.push(new RainDrop(
            this.x + i,
            this.y + this.height + ii,
            this
          ));
        }
      }
    }
  }

  update(deltaTime) {
    window.UFO45.context.globalAlpha = this.globalAlpha;
    window.UFO45.context.drawImage(this.image,
      this.animationFrames[this.currentAnimationFrame].x * this.width,
      this.animationFrames[this.currentAnimationFrame].y * this.height,
      this.width, this.height,
      this.x, 
      this.y,
      this.width, this.height
    );
    window.UFO45.context.globalAlpha = 1;
    this.move();
    this.animateCloud(deltaTime);
    this.animateRain(deltaTime);
    this.collisionDetection();
  }

  move() {
    this.x -= this.speed;
    if (this.x < -this.width) {
      this.currentAnimation = getRandomArbitrary(1, 10) > 6 ? 'rain' : 'default';
      this.currentAnimationFrame = 0;
      this.randomizeCoordinates();
      this.createRainDrops();
    }
  }

  animateCloud(deltaTime) {
    if (this.currentAnimation == 'rain') {
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

  animateRain(deltaTime) {
    if (this.currentAnimation != 'rain') {
      return;
    }
    this.rainDrops.forEach(drop => drop.update());
  }

  collisionDetection() {

    switch (window.UFO45.tileSize) {
      case 48:
        this.collisionBox = {
          x: this.x + 5,
          y: this.y + 16,
          width: this.width - 8,
          height: this.height - 29
        };
        this.collisionBox.height = this.currentAnimation == 'rain' ?
          this.collisionBox.height + this.height + 10 : this.collisionBox.height;
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

    if (collisionDetection(this.collisionBox, window.UFO45.player.collisionBox)) {
      window.UFO45.gameOver = true;
    }    
  }
}

class RainDrop {

  constructor(x, y, cloud) {
    this.width = 2;
    this.height = 2;
    this.x = x;
    this.y = y;
    this.cloud = cloud;
  }

  update() {
    window.UFO45.context.fillStyle = "#94cff4";
    window.UFO45.context.fillRect(this.x, this.y, this.width, this.height);
    this.x -= this.cloud.speed;
    this.y++;
    if (this.y > this.cloud.y + this.cloud.height * 2) {
      this.y = this.cloud.y + this.cloud.height - (this.cloud.height/4);
    }
    if (this.x < -this.width) {
      delete this;
    }
  }

}