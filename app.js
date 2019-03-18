/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer;

init();

// **********************
// *    BUTTON ROLL     *
// **********************
document.querySelector('.btn-roll').addEventListener('click', function() {

//1. Random number
var dice = Math.floor(Math.random() * 6) + 1;

//2. Show result
var diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'block';
diceDOM.src = 'dice-' + dice + '.png';


//3. Add result to current score
if (dice > 1) {
    roundScore += dice;
} else {
    nextPlayer();
}

document.getElementById('current-' + activePlayer).textContent = roundScore;
});

// **********************
// *    BUTTON HOLD     *
// **********************

document.querySelector('.btn-hold').addEventListener('click', function() {

// 1. Transfer round score to the general score
score[activePlayer] += roundScore;
document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
if (score[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    diceDisplay();
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

} else {
    nextPlayer();
}

});

// **********************
// *  BUTTON NEW GAME   *
// **********************

document.querySelector('.btn-new').addEventListener('click', function() {

init();

});

function nextPlayer() {

    document.getElementById('current-' + activePlayer).textContent = roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    diceDisplay();

}

function init() {

    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    diceDisplay();
}

function diceDisplay() {

    document.querySelector('.dice').style.display = 'none';

}