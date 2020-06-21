import Sound from './Sound.js';

export default class Player {

  constructor(image) {
    this.speed = 1;
    this.image = image;
    this.width = window.UFO45.tileSize;
    this.height = window.UFO45.tileSize;
    this.currentAnimationFrame = 0;
    this.animationFrameCount = 0;
    this.animationFrameCountThreshold = 100;
    this.animationFrames = [
      {x: 4, y: 0},
      {x: 5, y: 0},
      {x: 6, y: 0},
      {x: 7, y: 0},
      {x: 4, y: 1},
      {x: 5, y: 1},
      {x: 6, y: 1},
      {x: 7, y: 1},
      {x: 4, y: 2},
      {x: 5, y: 2},
      {x: 6, y: 2},
      {x: 7, y: 2}
    ];
    this.x = Math.ceil((window.UFO45.canvas.width / 2) - (this.width / 2));
    this.y = Math.ceil((window.UFO45.canvas.height / 2) - (this.height / 2));
    this.vector = [
      { x: 0, y: 0},
      { x: 0, y: 0}
    ];
    window.UFO45.canvas.addEventListener('touchstart', (ev) => {
      if (window.UFO45.gameStarted) {
        this.soundEffect.play();
      }
      this.ray.abducting = true;
      this.ray.currentAnimationFrame = 0;
      this.animationFrameCountThreshold = 10;
    });
    window.UFO45.canvas.addEventListener('touchmove', (ev) => {
      ev.preventDefault();
      this.vector[0].x = this.vector[1].x == ev.touches[0].clientX ?
        0 : this.vector[1].x < ev.touches[0].clientX ? -1 : 1;

      this.vector[0].y = this.vector[1].y == ev.touches[0].clientY ?
        0 : this.vector[1].y < ev.touches[0].clientY ? 1 : -1;

      this.vector[1].x = ev.touches[0].clientX;
      this.vector[1].y = ev.touches[0].clientY;
    });
    window.UFO45.canvas.addEventListener('touchend', (ev) => {
      this.soundEffect.stop();
      this.ray.abducting = false;
      this.animationFrameCountThreshold = 100;
    });
    this.soundEffect = new Sound('./../media/weird.mp3');
    this.soundEffect.sound.volume = .3;
    this.crashSoundEffect = new Sound('./../media/crashbit.wav', false);
    this.crashSoundEffect.sound.volume = 1;
    this.ray = new Ray(image, this.x, this.y);
  }

  update(deltaTime) {
    window.UFO45.context.drawImage(this.image,
      this.animationFrames[this.currentAnimationFrame].x * this.width,
      this.animationFrames[this.currentAnimationFrame].y * this.height,
      this.width, this.height,
      this.x, 
      this.y,
      this.width, this.height
    );
    this.animatePlayer(deltaTime);
    this.move(deltaTime);
    this.updatePlayersCollisionBox(deltaTime);
    this.canvasCollisionDetection();
    this.ray.update(deltaTime);
  }

  animatePlayer(deltaTime) {
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
    if (!window.UFO45.gameStarted) {
      return;
    }
    this.x += this.vector[0].x * this.speed;
    this.y -= this.vector[0].y * this.speed;
  }

  updatePlayersCollisionBox(deltaTime) {
    switch (window.UFO45.tileSize) {
      case 48:
        this.collisionBox = {
          x: this.x + 8,
          y: this.y + 2,
          width: this.width - 16,
          height: this.height - 3
        };
        break;
    }
    if (window.UFO45.debug) {
      window.UFO45.context.strokeStyle = "blue";
      window.UFO45.context.beginPath();
      window.UFO45.context.rect(
        this.collisionBox.x,
        this.collisionBox.y,
        this.collisionBox.width,
        this.collisionBox.height
      );
      window.UFO45.context.stroke();
    }
  }

  canvasCollisionDetection() {
    if ((this.x + this.width) >= window.UFO45.canvas.width) {
      this.x = Math.ceil(window.UFO45.canvas.width - this.width);
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if ((this.y + this.height) > window.UFO45.canvas.height - window.UFO45.foreground.height) {
      window.UFO45.gameOver = true;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }

}

class Ray {

  constructor(image, x, y) {
    this.x = x;
    this.y = y;
    this.width = window.UFO45.tileSize;
    this.height = window.UFO45.tileSize;
    this.image = image;
    this.abducting = false;
    this.currentAnimationFrame = 0;
    this.animationFrameCount = 0;
    this.animationFrameCountThreshold = 100;
    this.animationFrames = [
      {x: 4, y: 6},
      {x: 5, y: 6},
      {x: 6, y: 6},
      {x: 3, y: 7},
      {x: 4, y: 7},
      {x: 5, y: 7},
      {x: 6, y: 7},
      {x: 7, y: 7}
    ];
  }

  update(deltaTime) {
    this.x = window.UFO45.player.x;
    this.y = window.UFO45.player.y + window.UFO45.player.height;
    if (!this.abducting || !window.UFO45.abducteeFactory.abductee.beingAbducted) {
      return;
    }
    window.UFO45.context.drawImage(this.image,
      this.animationFrames[this.currentAnimationFrame].x * this.width,
      this.animationFrames[this.currentAnimationFrame].y * this.height,
      this.width, this.height,
      this.x, 
      this.y,
      this.width, this.height
    );
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