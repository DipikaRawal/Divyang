import * as Stages from './stages';

let canvas, ctx, background, currentGame, screenWidth, screenHeight;

function render(game) {
  currentGame = game;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  screenWidth = canvas.width;
  screenHeight = canvas.height;

  window.requestAnimationFrame(renderRepaint);
}

// note test
// This is where the recursive call to rAF() happens
function renderRepaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  switch(currentGame.stage){
    case Stages.NOT_STARTED:
      renderInstructions();
      break;

    case Stages.PLAYING:
      renderWords();
      break;

    case Stages.PAUSED:
      renderPauseScreen();
      break;
  }

  // put two below in case stages.PLAYING:
  // renderWords();
  displayGameInfo();

  window.requestAnimationFrame(() => renderRepaint());
}

const renderPauseScreen = () => {
  renderOverlay();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = 24;
  ctx.fillText("Game Paused!", currentGame.screenWidth / 2, 250);
  ctx.fillText("Press ESC to resume", currentGame.screenWidth / 2, 280);
};

const renderOverlay = () => {
  ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
  ctx.fillRect(0, 0, currentGame.screenWidth, currentGame.screenHeight);
};

const renderInstructions = () => {
  ctx.font = 44;
  ctx.fillText("Instructions:", currentGame.screenWidth / 2, 180);

  ctx.font = 15;
  ctx.fillText("Type the words that appear on-screen and", currentGame.screenWidth / 2, 220);
  ctx.fillText("hit ENTER before they reach the ground", currentGame.screenWidth / 2, 250);
  ctx.fillText("Hit ESC to pause", currentGame.screenWidth / 2, 320);
  ctx.fillText("Press SPACE to start playing!", currentGame.screenWidth / 2, 380);
};

const renderBackground = () => {
  background = document.getElementById("background");
  ctx.drawImage(background, 0, 0, 900, 635);
};

const renderWords = () => {
  currentGame.targets.forEach((target) => {

    ctx.font = "30px Verdana";
    ctx.fillText(target.target, target.x, target.y);

    if (target.y === canvas.height - 33) {
      currentGame.missed.push(target.target);
      currentGame.lives--;
      currentGame.removeTarget(target);
    } else if (target.solved) {
      currentGame.removeTarget(target);
    }

  });
};

const displayGameInfo = () => {
  ctx.font="30px Verdana";

  ctx.textAlign="left";
  ctx.fillText(`Score: ${currentGame.score}`, 30, screenHeight - 10);

  ctx.textAlign="right";
  ctx.fillText(`Lives: ${currentGame.lives}`, screenWidth - 30, screenHeight - 10);

  ctx.textAlign="center";
  ctx.fillText(`${currentGame.answer}`, screenWidth/2 , screenHeight - 10);

  if (currentGame.lives === 0) {
    currentGame.answer = '';

    ctx.font = "30px Verdana";
    ctx.fillStyle = 'black';

    ctx.fillText("Game Over!", screenWidth/2, screenHeight/3);
    ctx.fillText(`Your score: ${currentGame.score}`, screenWidth/2, screenHeight/3 + 50);
    ctx.fillText("Press SPACE to restart", screenWidth/2, screenHeight/3 + 100);

    ctx.font = "30px Verdana";
    ctx.fillStyle = 'red';
    ctx.fillText(`Missed words: ${currentGame.missed[0]}, ${currentGame.missed[1]}, ${currentGame.missed[2]}`, screenWidth/2, screenHeight/3 + 150);

    ctx.fillStyle = 'black';
  }
};

export default render;
