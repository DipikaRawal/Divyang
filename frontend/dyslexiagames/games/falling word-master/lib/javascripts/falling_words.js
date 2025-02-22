import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();

  handleInput(game);
});

const handleInput = (game) => {
  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.handleInput(e);
  });
};
