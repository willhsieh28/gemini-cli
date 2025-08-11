document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const pets = [
    'pet-1', 'pet-2', 'pet-3', 'pet-4',
    'pet-5', 'pet-6', 'pet-7', 'pet-8',
  ];
  const gamePets = [...pets, ...pets]; // Each pet appears twice

  // Shuffle the pets
  gamePets.sort(() => 0.5 - Math.random());

  let selectedTiles = [];
  let matchedPairs = 0;

  // Create the game board
  for (let i = 0; i < gamePets.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile', gamePets[i]);
    tile.dataset.pet = gamePets[i];
    gameBoard.appendChild(tile);

    tile.addEventListener('click', () => {
      if (selectedTiles.length < 2 && !tile.classList.contains('matched')) {
        tile.classList.add('selected');
        selectedTiles.push(tile);

        if (selectedTiles.length === 2) {
          setTimeout(checkForMatch, 500);
        }
      }
    });
  }

  function checkForMatch() {
    const [tile1, tile2] = selectedTiles;
    if (tile1.dataset.pet === tile2.dataset.pet) {
      tile1.classList.add('matched');
      tile2.classList.add('matched');
      matchedPairs++;
      if (matchedPairs === pets.length) {
        alert('You win!');
      }
    } else {
      tile1.classList.remove('selected');
      tile2.classList.remove('selected');
    }
    selectedTiles = [];
  }
});
