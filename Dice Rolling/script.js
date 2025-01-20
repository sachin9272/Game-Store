const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const result = document.getElementById('result');
const rollDiceButton = document.getElementById('rollDice');

rollDiceButton.addEventListener('click', () => {
  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;

  dice1.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/${roll1}/Dice-${roll1}-b.svg/1024px-Dice-${roll1}-b.svg.png`;
  dice2.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/${roll2}/Dice-${roll2}-b.svg/1024px-Dice-${roll2}-b.svg.png`;

  if (roll1 > roll2) {
    result.textContent = `Player 1 wins! (${roll1} vs ${roll2})`;
  } else if (roll2 > roll1) {
    result.textContent = `Player 2 wins! (${roll2} vs ${roll1})`;
  } else {
    result.textContent = `It's a draw! (${roll1} vs ${roll2})`;
  }
});