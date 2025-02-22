/*
 *  Pixelated
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

(() => {
  // Constants
  const GRID_SIZE = { width: 12, height: 13 };
  const COLORS = [
    '#0000ff', // Blue
    '#ff0000', // Red
    '#008000', // Green
    '#ffff00', // Yellow
    '#ffa500', // Orange
    '#800080', // Purple
  ];
  const MAX_MOVES = 22;

  // Game State
  let grid = [];
  let movesLeft = MAX_MOVES;
  let winningStreak = 0;

  // DOM Elements
  const boardElement = document.getElementById('board');
  const controlsElement = document.getElementById('controls');
  const statusElement = document.getElementById('status');
  const winningStreakDisplay = document.getElementById('winning-streak');
  const newButton = document.getElementById('new-button');
  const helpButton = document.getElementById('help-button');
  const helpContainer = document.getElementById('help-container');
  const helpTitle = document.getElementById('help-title');
  const helpDescription = document.getElementById('help-description');
  const helpObjective = document.getElementById('help-objective');
  const helpInstructions = document.getElementById('help-instructions');
  const helpControls = document.getElementById('help-controls');
  const backButton = document.getElementById('back-button');
  const copyright = document.getElementById('copyright');

  // Initialize the Game
  const initGame = () => {
    resetGame();
    grid = generateGrid();
    renderGrid();
    renderControls();
  };

  // Generate the initial grid with random colors
  const generateGrid = () => {
    return Array.from({ length: GRID_SIZE.height }, () =>
      Array.from(
        { length: GRID_SIZE.width },
        () => COLORS[Math.floor(Math.random() * COLORS.length)]
      )
    );
  };

  // Render the grid to the board
  const renderGrid = () => {
    boardElement.style.gridTemplateColumns = `repeat(${GRID_SIZE.width}, 1fr)`;
    boardElement.innerHTML = grid
      .flatMap((row, y) =>
        row.map(
          (color, x) =>
            `<div class="cell" style="background-color:${color}"></div>`
        )
      )
      .join('');
  };

  // Render the game controls
  const renderControls = () => {
    // Render color buttons
    controlsElement.innerHTML = COLORS.map(
      (color) =>
        `<button class="color-button" style="background-color:${color}" data-color="${color}"></button>`
    ).join('');
    Array.from(controlsElement.children).forEach((button) =>
      button.addEventListener('click', () => floodFill(button.dataset.color))
    );

    // Set up help modal
    helpButton.addEventListener('click', () => toggleHelpModal(true));
    backButton.addEventListener('click', () => toggleHelpModal(false));

    // Set texts
    newButton.textContent = TEXTS.NEW_BUTTON;
    helpTitle.textContent = TEXTS.HELP_TITLE;
    helpDescription.textContent = TEXTS.HELP_DESCRIPTION;
    helpObjective.textContent = TEXTS.HELP_OBJECTIVE;
    helpInstructions.textContent = TEXTS.HELP_INSTRUCTIONS;
    helpControls.textContent = TEXTS.HELP_CONTROLS;
    backButton.textContent = TEXTS.BACK_BUTTON;
    copyright.innerHTML = TEXTS.COPYRIGHT;
  };

  // Toggle help modal visibility
  const toggleHelpModal = (isVisible) => {
    helpContainer.classList.toggle('hidden', !isVisible);
    helpContainer.classList.toggle('visible', isVisible);
  };

  // Flood fill algorithm
  const floodFill = (newColor) => {
    const oldColor = grid[0][0];
    if (newColor === oldColor || movesLeft <= 0) return;

    const fill = (x, y) => {
      if (
        x < 0 ||
        y < 0 ||
        x >= GRID_SIZE.width ||
        y >= GRID_SIZE.height ||
        grid[y][x] !== oldColor
      )
        return;
      grid[y][x] = newColor;
      fill(x + 1, y);
      fill(x - 1, y);
      fill(x, y + 1);
      fill(x, y - 1);
    };

    fill(0, 0);
    movesLeft--;
    renderGrid();
    updateStatus();

    if (checkWin()) {
      endGame(TEXTS.WIN_MESSAGE(movesLeft));
    } else if (movesLeft <= 0) {
      endGame(TEXTS.LOSS_MESSAGE);
    }
  };

  // Check if the game is won
  const checkWin = () => {
    return grid.every((row) => row.every((cell) => cell === grid[0][0]));
  };

  // Update the status text
  const updateStatus = () => {
    statusElement.textContent = TEXTS.MOVES_LEFT(movesLeft);
  };

  // Update winning streak
  const updateWinningStreak = (reset = false) => {
    if (reset) {
      winningStreak = 0;
    } else {
      winningStreak++;
      winningStreakDisplay.classList.remove('hidden');
      winningStreakDisplay.textContent = `${TEXTS.WINNING_STREAK} ${winningStreak}`;
    }
  };

  // End game with provided message
  const endGame = (message) => {
    statusElement.textContent = message;
    disableControls();

    if (message === TEXTS.LOSS_MESSAGE) {
      updateWinningStreak(true);
    } else {
      updateWinningStreak();
    }
  };

  // Disable color controls after game over or win
  const disableControls = () => {
    Array.from(controlsElement.children).forEach(
      (button) => (button.disabled = true)
    );
  };

  // Reset game state
  const resetGame = () => {
    movesLeft = MAX_MOVES;
    updateStatus();
    winningStreakDisplay.classList.add('hidden');
  };

  // Restart the game with New button and N key
  newButton.addEventListener('click', initGame);
  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyN') initGame();
  });

  // Disable context menu (right-click) on the board
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Start the game
  initGame();
})();
