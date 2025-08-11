document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const NUM_PAIRS = 75; // 15x10 grid / 2

  // --- Helper Functions ---

  /**
   * Generates a set of unique, visually distinct random colors.
   * @param {number} count - The number of unique colors to generate.
   * @returns {string[]} An array of hex color strings.
   */
  function generateUniqueColors(count) {
    const colors = new Set();
    // Use HSL color space to generate more visually distinct colors
    const saturation = 100;
    const lightness = 70;
    while (colors.size < count) {
      const hue = Math.floor(Math.random() * 360);
      colors.add(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return Array.from(colors);
  }

  /**
   * Creates a <style> element and injects CSS rules for pet colors.
   * @param {string[]} colors - An array of hex color strings.
   */
  function createStyleSheet(colors) {
    const styleSheet = document.createElement('style');
    let rules = '';
    colors.forEach((color, i) => {
      rules += `.pet-${i + 1} { background-color: ${color}; }\n`;
    });
    styleSheet.textContent = rules;
    document.head.appendChild(styleSheet);
  }


  // --- Game Setup ---

  const colors = generateUniqueColors(NUM_PAIRS);
  createStyleSheet(colors);

  const pets = Array.from({ length: NUM_PAIRS }, (_, i) => `pet-${i + 1}`);
  const gamePets = [...pets, ...pets]; // Each pet appears twice (150 total)

  // Shuffle the pets
  gamePets.sort(() => 0.5 - Math.random());

  let selectedTiles = [];
  let matchedPairs = 0;


  // --- Game Logic ---

  // Create the game board
  for (let i = 0; i < gamePets.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile', gamePets[i]);
    tile.dataset.pet = gamePets[i];
    gameBoard.appendChild(tile);

    tile.addEventListener('click', () => {
      // Prevent clicking matched tiles or more than 2 tiles
      if (tile.classList.contains('matched') || selectedTiles.length >= 2) {
        return;
      }

      // Prevent clicking the same tile twice
      if (selectedTiles.length === 1 && selectedTiles[0] === tile) {
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
      tile1.classList.add('matched');
      tile2.classList.add('matched');
      tile1.classList.remove('selected'); // clean up selected style
      tile2.classList.remove('selected'); // clean up selected style
      matchedPairs++;
      if (matchedPairs === NUM_PAIRS) {
        // Use a more modern dialog if possible, but alert is fine for this scope.
        setTimeout(() => alert('You win! Congratulations!'), 100);
      }
    } else {
      tile1.classList.remove('selected');
      tile2.classList.remove('selected');
    }
    selectedTiles = [];
  }
});
