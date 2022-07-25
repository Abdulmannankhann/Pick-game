'use strict';
//First we will select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//Starting conditions
let isPlaying, scores, currentScore, activePlayer;
const initialization = function () {
  isPlaying = true;
  currentScore = 0;
  scores = [0, 0];
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
};
initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//functionality
//1- generate a random dice no
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log('Dice =', dice);

    //2- display that dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3-check if it is 1 or not and take action accordingly
    if (dice !== 1) {
      currentScore += dice;
      console.log('Current Score', currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //change later to which player is playing
      //if it is not 1 then add dice to current score
    } else {
      //if it is 1 then switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //add current score to player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score >= 100 then player wins
    if (scores[activePlayer] >= 100) {
      //winning state
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if score < 100 than switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);
