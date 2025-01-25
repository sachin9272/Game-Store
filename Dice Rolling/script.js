const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const result = document.getElementById('result');
const rollDiceButton = document.getElementById('rollDice');

rollDiceButton.addEventListener('click', () => {
  // Generate random dice rolls
  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;

  // Update dice images based on rolls
  dice1.src = `https://upload.wikimedia.org/wikipedia/commons/${getDiceImagePath(roll1)}`;
  dice2.src = `https://upload.wikimedia.org/wikipedia/commons/${getDiceImagePath(roll2)}`;

  // Determine winner
  if (roll1 > roll2) {
    result.textContent = `Player 1 wins! (${roll1} vs ${roll2})`;
  } else if (roll2 > roll1) {
    result.textContent = `Player 2 wins! (${roll2} vs ${roll1})`;
  } else {
    result.textContent = `It's a draw! (${roll1} vs ${roll2})`;
  }
});

function getDiceImagePath(roll) {
  const paths = [
    '1/1b/Dice-1-b.svg',
    '5/5f/Dice-2-b.svg',
    'b/b1/Dice-3-b.svg',
    'f/fd/Dice-4-b.svg',
    'thumb/0/08/Dice-5-b.svg/900px-Dice-5-b.svg.png',
    '2/26/Dice-6-b.svg',
  ];
  return paths[roll - 1];
}
