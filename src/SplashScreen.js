import {getCookie} from './cookies';

export default class SplashScreen {

  constructor() {
    this.gamestartScoreboard = document.querySelector('.gamestart-scoreboard');
    this.nameField = this.gamestartScoreboard.querySelector('input[type="text"]');
    this.submitButton = this.gamestartScoreboard.querySelector('input[type="submit"]');
    this.fillTopPlayers();
    this.fillUserName();
    this.submitButton.onclick = () => {
      this.playerNameEventListener();
    };
  }

  fillUserName() {
    const playerName = getCookie('playerName');
    if (playerName) {
      this.nameField.value = playerName;
    }
  }

  fillTopPlayers() {
    fetch('get-top-players.php')
      .then(response => response.json())
      .then(players => {
        let body = this.gamestartScoreboard.querySelector('tbody');
        body.innerHTML = '';
        players.forEach((player, index) => {

          let tr = document.createElement('tr'),
            td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td');

          td1.innerHTML = index + 1;
          td2.innerHTML = player.name;
          td3.innerHTML = player.score;

          const playerId = parseInt(getCookie('playerId'));
          if (parseInt(player.id) === playerId) {
            tr.classList.add('selected');
          }

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          body.appendChild(tr);
        });
      });
  }

  playerNameEventListener() {

    const playerId = parseInt(getCookie('playerId'));
    const playerName = this.gamestartScoreboard.querySelector('input[type="text"]');


    if (!playerName.value) {
      playerName.value = 'Anonymous';
    }

    if (playerName.value === getCookie('playerName') && !isNaN(parseInt(getCookie('playerId')))) {
      return this.startGame();
    }


    const formData = new FormData();
    formData.append('playerId', isNaN(playerId) ? false : playerId);
    formData.append('playerName', playerName.value);

    fetch('submit-player-name.php', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(response => {
        this.startGame();
      });
  }

  startGame() {
    this.gamestartScoreboard.style.display = 'none';
    window.UFO45.startGame();
  }

}