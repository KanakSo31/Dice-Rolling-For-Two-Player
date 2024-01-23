"use strict";
const playerSg = document.querySelector(".player--0");
const playerDg = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, currentScore1, playing;
// Starting Condition

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  currentScore1 = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add("hidden");
  playerSg.classList.remove("player--winner");
  playerDg.classList.remove("player--winner");
  playerSg.classList.add("player--active");
  playerDg.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${currentScore1}`).textContent = 0;
  currentScore1 = currentScore1 === 0 ? 1 : 0;
  currentScore = 0;
  // currentScore1 += dice;
  // current1Element.textContent = currentScore1;
  playerSg.classList.toggle("player--active");
  playerDg.classList.toggle("player--active");
};

// Rolling Dice element
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    //   console.log([dice]);
    //  2. Display The Dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice_image/dice-${dice}.png`;
    //   3.Check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${currentScore1}`).textContent =
        currentScore;
      // current0Element.textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // add current score to active player's score
    scores[currentScore1] += currentScore;
    console.log(scores[currentScore1]);
    // scores[1]=scores[1]+currentScore;
    document.getElementById(`score--${currentScore1}`).textContent =
      scores[currentScore1];
    // check if players score is >=100score
    if (scores[currentScore1] >= 20) {
      // finish the game
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${currentScore1}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentScore1}`)
        .classList.remove("player--active");
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
// 18 lecture 07
