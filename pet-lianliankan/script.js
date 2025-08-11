document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');

  const EMOJIS = [
    '🦮', '🐕‍🦺', '🦊', '🐱', '🐈', '🦁', '🐯', '🐆', '🫎', '🐎',
    '🫏', '🦌', '🐂', '🐷', '🐏', '🐐', '🐫', '🐪', '🦣', '🐁',
    '🐀', '🐹', '🐭', '🐻', '🐤', '🐥', '🦜', '🐦‍🔥', '🐳', '🐬',
    '🦋', '🪲', '🐞'
  ];

  const NUM_PAIRS = EMOJIS.length;
  const gamePets = [...EMOJIS, ...EMOJIS];
  gamePets.sort(() => 0.5 - Math.random());

  let selectedTiles = [];
  let matchedPairs = 0;

  for (let i = 0; i < gamePets.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = gamePets[i];
    tile.dataset.pet = gamePets[i];
    gameBoard.appendChild(tile);

    tile.addEventListener('click', () => {
      // Re-add 'matched' check, as we are no longer removing elements.
      if (tile.classList.contains('selected') || tile.classList.contains('matched') || selectedTiles.length >= 2) {
        return;
      }
      tile.classList.add('selected');
      selectedTiles.push(tile);
      if (selectedTiles.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    });
  }

  function checkForMatch() {
    const [tile1, tile2] = selectedTiles;
    if (tile1.dataset.pet === tile2.dataset.pet) {
      // Revert to adding a class. The CSS will handle hiding it.
      tile1.classList.add('matched');
      tile2.classList.add('matched');
      matchedPairs++;
      if (matchedPairs === NUM_PAIRS) {
        setTimeout(() => alert('You win! Congratulations!'), 100);
      }
    } else {
      tile1.classList.remove('selected');
      tile2.classList.remove('selected');
    }

    selectedTiles = [];
  }
});
