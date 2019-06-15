/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, roundScore, currentScore, dice, winningScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //Roll Dice
    dice = Math.floor(Math.random() * 6 + 1);
    //Change dice icon
    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //Change activePlayer on dice value 1
    if (dice !== 1) {
        //Add dice value to currentScore
        currentScore += dice;
        document.getElementById('current-' + activePlayer).textContent = currentScore;
    } else {
        nextPlayer();
    }
}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Remove currentScore by transferring it to roundScore
        document.getElementById('score-' + activePlayer).textContent = roundScore[activePlayer] += currentScore;
        winningScore = roundScore;
        //Check Winner
        if(winningScore[activePlayer] >= 20) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('name-' + activePlayer).textContent = 'winner';
            gamePlaying = false;
        } else {
    nextPlayer();
    }
}    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    currentScore = 0;
    document.getElementById('current-' + activePlayer).textContent = currentScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDOM.style.display = 'none';
}

function init() {
    activePlayer = 0;
    roundScore = [0, 0];
    currentScore = 0;
    winningScore = 0;
    gamePlaying = true;
    //Winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //Active
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //Player name
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    //roundScore
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    //currentScore
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
};