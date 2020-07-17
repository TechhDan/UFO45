import './style.css';
import SpriteSheet from './SpriteSheet-48x48.png';
import Player from './Player';
import Foreground from './Foreground';
import Sound from './Sound';
import Score from './Score';
import Bushes from './Bushes';
import CloudEnemies from './Cloud';
import ScoreUpdater from './ScoreUpdater';
import SplashScreen from './SplashScreen';
import AbducteeFactory from './AbducteeFactory';
import Background from './Background';

class Game {

  constructor() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
    this.tileSize = 48;
    this.gameStarted = false;
    this.gameOver = false;
    this.debug = false;
    this.mainscreenSoundtrack = new Sound('./../media/just-because.mp3');
  }

  init() {
    let image = new Image();
    image.src = SpriteSheet;
    this.soundTrack = new Sound('./../media/UFOAbduction.mp3');
    this.score = new Score();
    this.background = new Background(image);
    this.player = new Player(image);
    this.foreground = new Foreground(image);
    this.CloudEnemies = new CloudEnemies(image);
    this.abducteeFactory = new AbducteeFactory(image);
    this.bushes = [
      new Bushes(image, Math.ceil(Math.random() * window.UFO45.canvas.width)),
      new Bushes(image, Math.ceil(Math.random() * window.UFO45.canvas.width)),
      new Bushes(image, Math.ceil(Math.random() * window.UFO45.canvas.width))
    ];
    this.SplashScreen = new SplashScreen();
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update(timestamp) {
    const deltaTime = timestamp - (this.lastUpdate || 0);
    this.lastUpdate = timestamp;

    this.clear();
    this.background.update(deltaTime);
    this.score.update(deltaTime);
    if (this.gameStarted) {
      this.player.update(deltaTime);
      this.CloudEnemies.update(deltaTime);
    }

    this.foreground.update(deltaTime);
    this.bushes.forEach((bush) => {
      bush.update(deltaTime);
    });
    this.abducteeFactory.update(deltaTime);

    if (this.gameOver) {
      this.scoreUpdater = new ScoreUpdater();
      return this.scoreUpdater.writeScore();
    }

    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  startGame() {
    window.UFO45.soundTrack.play();
    window.UFO45.gameStarted = true;
  }

}

window.UFO45 = new Game();
window.onload = function() {
  window.UFO45.init();
};