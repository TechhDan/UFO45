export default class Score {

  constructor() {
    this.font = '18px monaco, monospace';
    this.color = "black";
    this.x = 10;
    this.y = 30;
    this.score = 0;
    window.UFO45.context.font = this.font;
  }

  update(deltaTime) {
    if (window.UFO45.gameStarted && !window.UFO45.gameOver) {
      this.score += 1 * deltaTime / 1000;
    }
    window.UFO45.context.fillStyle = this.color;
    window.UFO45.context.fillText("Score " + Math.floor(this.score), this.x, this.y);
  }

}
