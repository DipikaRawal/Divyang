import * as Stages from './stages';
import render from './environment';
import Target from './target';

class Game {
  constructor() {
    const canvas = document.getElementById('canvas');
    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.reset();

    render(this);

  }

  reset() {
    this.targets = [];
    this.score = 0;
    this.answer = '';
    this.lives = 3;
    this.paused = false;
    this.stage = Stages.NOT_STARTED;
    this.missed = [];
  }

  startRound(lives) {
    this.stage = Stages.PLAYING;

    this.count = 1;
    this.lives = lives;
    this.dropInterval = 1000 - (this.score);

    this.roundLoop = setInterval(() => {
      if(!this.paused) {
        if (this.lives > 0 && this.count % 2 !== 0) {

          const target = new Target();
          this.targets.push(target);

          target.drop();
          this.count++;

        } else {
          clearInterval(this.roundLoop);
          this.startRound(this.lives);
        }
      }
    }, this.dropInterval);
  }


  handleInput(e) {
    const keyCode = e.which;

    switch(this.stage){
      case Stages.NOT_STARTED:
        if (keyCode === 32) {
          this.startRound(3);
        }
        break;

      case Stages.PAUSED:
        if (keyCode === 27) {
          this.unpause();
        }
        break;

      case Stages.PLAYING:
        if (this.lives > 0) {
          if (keyCode >= 65 && keyCode <= 90){
            this.answer += e.key;
          } else if (keyCode === 8) {
            this.answer = this.answer.slice(0, -1);
          } else if (keyCode === 13) {
            this.checkInput(this.answer);
            this.answer = "";
          } else if (keyCode === 27) {
            this.pause();
          }
        } else if (keyCode === 32 ) {
          this.reset();
          this.stage = Stages.PLAYING;
        }
        break;

    }

  }

  pause() {
    if (this.stage === Stages.PLAYING) {
      this.stage = Stages.PAUSED;
      this.paused = true;
      this.targets.forEach((target) => target.pause());
    }
  }

  unpause() {
    if (this.stage === Stages.PAUSED) {
      this.stage = Stages.PLAYING;
      this.paused = false;
      this.targets.forEach((target) => target.unpause());
    }
  }

  removeTarget(target) {
    const idx = this.targets.indexOf(target);
    this.targets.splice(idx, 1);

    if (this.lives === 0) {
      this.targets = [];
    }
  }

  checkInput(input) {
    this.targets.forEach((target) => {
      if ( input === target.target ) {
        this.score += 10;
        target.solved = true;
      }
    });
  }

}

export default Game;
