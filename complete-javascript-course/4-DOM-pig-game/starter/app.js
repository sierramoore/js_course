/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// EVENTS - notify  that something happened like btn click, resizing, sroll, keypress..
// event listener: a function that has an action based on an event

// STATE VARIABLE - a condition of a system - like true or false active or not active
// gamePlaying is the state variable -set to false if a player wins and wraped the btn for dice roll and hold in a if(gamePlaying) condition bc dont want those to function if a player won(which is set to false at that state)
/* CALLBACK FUNCTION
function btn(){

}
document.querySelector('.btn-roll').addEventListener('click', btn);

* btn here is a callback function of eventListener
*callback function is a function that is not called right away like btn() but called by another function as an agurment like btn (without parenthesis)
*/

let scores, roundScore, activePlayer, gamePlaying;

init();

// setter //
// document.querySelector('#current-' + activePlayer).textContent = dice;

// getter //
let x = document.querySelector('#current-' + activePlayer).textContent;

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //set round score back to zero after switching player (to not add current points to other player)
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // dot next to player change style
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // clear dice b4 next players turn
    document.querySelector('.dice').style.display = 'none';
}

let lastDice;
// ANONYMUS FUNCTION
// is a function that doesnt have a name so it cannot be reused
document.querySelector('.btn-roll').addEventListener('click', function(){
    // values will be lost after this function returns so store previous roll outside
    if(gamePlaying) {

        // 1. random number
        let dice = Math.floor((Math.random() * 6) + 1);

        // 2. display result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //if roll 6 twice in a row loose score
        if (dice === 6 && lastDice === 6) {
            console.log('you rolled 6 twice in a row');
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

            // 3. update the roundScore IF the rolled number isnt a 1
        } else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player - switch turns
            nextPlayer();
        }

        lastDice = dice;
    }
});




document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        // add currentScore to global score
        scores[activePlayer] += roundScore; //update score for player in scores array

        // update  UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let inputScore = document.querySelector('#inputScore').value;
        let winningScore;

        if(inputScore){
            winningScore = inputScore;

        } else {
            winningScore = 100;
        }

        //check if player won game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            //next player - switch turns
            nextPlayer();
        }
    }
});

//callback
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);

    // remove winner and active classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}