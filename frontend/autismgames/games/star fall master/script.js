const gameArea = document.getElementById('game-area');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const scoreDisplay = document.getElementById('score');
let score = 0;
let intervalId;

function createStar() {
  const star = document.createElement('span');
  star.classList.add('star');
  star.textContent = '★';
  const leftPos = Math.floor(Math.random() * 100); // Random horizontal position
  star.style.left = `${leftPos}%`;
  gameArea.appendChild(star);
  animateStar(star);
}

function animateStar(star) {
  star.style.animationPlayState = 'running';
  star.addEventListener('click', catchStar);
}

function catchStar() {
  this.parentNode.removeChild(this);
  score++;
  scoreDisplay.textContent = score;
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameArea.innerHTML = ''; // Clear existing stars
  intervalId = setInterval(createStar, 1000); // Create a new star every second
  startButton.disabled = true; // Disable start button after game starts
  stopButton.disabled = false; // Enable stop button
}

function stopGame() {
  clearInterval(intervalId);
  startButton.disabled = false; // Enable start button after game stops
  stopButton.disabled = true; // Disable stop button
}

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
