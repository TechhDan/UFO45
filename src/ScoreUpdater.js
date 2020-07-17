import {getCookie} from './cookies';

export default class ScoreUpdater {

  constructor() {
    window.UFO45.player.soundEffect.stop();
    window.UFO45.player.crashSoundEffect.play();
    window.UFO45.soundTrack.stop();
    window.UFO45.mainscreenSoundtrack.play();
  }

  writeScore() {
    this.gameoverScoreboard = document.querySelector('.gameover-scoreboard');
    this.gameoverScoreboard.style.display = 'flex';
    this.gameoverScoreboard.addEventListener('touchstart', () => {
      location.reload();
    });
    this.updateScore();
  }

  updateScore() {
    const playerId = parseInt(getCookie('playerId'));
    fetch(`get-scores.php?playerScore=${parseInt(window.UFO45.score.score)}&playerId=${playerId}`)
      .then(response => response.json())
      .then(json => {
        let body = this.gameoverScoreboard.querySelector('tbody'),
          playerId = parseInt(getCookie('playerId'));
        body.innerHTML = '';
        json.forEach(player => {
          let tr = document.createElement('tr'),
            td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td');

          td1.innerHTML = player.rank;
          td2.innerHTML = player.name;
          td3.innerHTML = player.score;

          if (player.id === playerId) {
            tr.classList.add('selected');
          }

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          body.appendChild(tr);
        });
      });
  }

}