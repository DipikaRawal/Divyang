/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NOT_STARTED = 0;
/* harmony export (immutable) */ __webpack_exports__["a"] = NOT_STARTED;

const PLAYING = 1;
/* harmony export (immutable) */ __webpack_exports__["c"] = PLAYING;

const PAUSED = 2;
/* harmony export (immutable) */ __webpack_exports__["b"] = PAUSED;

const ROUND_WON = 3;
/* unused harmony export ROUND_WON */

const ROUND_LOST = 4;
/* unused harmony export ROUND_LOST */

const GAME_OVER = 5;
/* unused harmony export GAME_OVER */



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);


document.addEventListener('DOMContentLoaded', () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();

  handleInput(game);
});

const handleInput = (game) => {
  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.handleInput(e);
  });
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stages__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__target__ = __webpack_require__(4);




class Game {
  constructor() {
    const canvas = document.getElementById('canvas');
    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.reset();

    Object(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* default */])(this);

  }

  reset() {
    this.targets = [];
    this.score = 0;
    this.answer = '';
    this.lives = 3;
    this.paused = false;
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* NOT_STARTED */];
    this.missed = [];
  }

  startRound(lives) {
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */];

    this.count = 1;
    this.lives = lives;
    this.dropInterval = 1000 - (this.score);

    this.roundLoop = setInterval(() => {
      if(!this.paused) {
        if (this.lives > 0 && this.count % 2 !== 0) {

          const target = new __WEBPACK_IMPORTED_MODULE_2__target__["a" /* default */]();
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
      case __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* NOT_STARTED */]:
        if (keyCode === 32) {
          this.startRound(3);
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* PAUSED */]:
        if (keyCode === 27) {
          this.unpause();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */]:
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
          this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */];
        }
        break;

    }

  }

  pause() {
    if (this.stage === __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */]) {
      this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* PAUSED */];
      this.paused = true;
      this.targets.forEach((target) => target.pause());
    }
  }

  unpause() {
    if (this.stage === __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* PAUSED */]) {
      this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */];
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stages__ = __webpack_require__(0);


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
    case __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* NOT_STARTED */]:
      renderInstructions();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */]:
      renderWords();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* PAUSED */]:
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

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const words = ["adult", "aeroplane", "air", "aircraft", "carrier", "airforce", "airport", "album", "alphabet", "apple", "arm", "army", "baby", "baby", "backpack", "balloon", "banana", "bank", "barbecue", "bathroom", "bathtub", "bed", "bed", "bee", "bible", "bible", "bird", "bomb", "book", "boss", "bottle", "bowl", "box", "boy", "brain", "bridge", "butterfly", "button", "cappuccino", "car", "carpet", "carrot", "cave", "chair", "chess", "board", "chief", "child", "chisel", "chocolates", "church", "church", "circle", "circus", "circus", "clock", "clown", "coffee", "comet", "compact", "disc", "compass", "computer", "crystal", "cup", "cycle", "data", "base", "desk", "diamond", "dress", "drill", "drink", "drum", "dung", "ears", "earth", "egg", "electricity", "elephant", "eraser", "explosive", "eyes", "family", "fan", "feather", "festival", "film", "finger", "fire", "floodlight", "flower", "foot", "fork", "freeway", "fruit", "fungus", "game", "garden", "gas", "gate", "gemstone", "girl", "gloves", "god", "grapes", "guitar", "hammer", "hat", "hieroglyph", "highway", "horoscope", "horse", "hose", "ice", "insect", "jet", "fighter", "junk", "kitchen", "knife", "leather", "jacket", "leg", "library", "liquid", "magnet", "man", "map", "maze", "meat", "meteor", "microscope", "milk", "milkshake", "mist", "money", "monster", "mosquito", "mouth", "nail", "navy", "necklace", "needle", "onion", "paintbrush", "pants", "parachute", "passport", "pebble", "pendulum", "pepper", "perfume", "pillow", "plane", "planet", "pocket", "potato", "printer", "prison", "pyramid", "radar", "rainbow", "record", "restaurant", "rifle", "ring", "robot", "rock", "rocket", "roof", "room", "rope", "saddle", "salt", "sandpaper", "sandwich", "satellite", "school", "ship", "shoes", "shop", "shower", "signature", "skeleton", "slave", "snail", "software", "solid", "space", "shuttle", "spectrum", "sphere", "spice", "spiral", "spoon", "spot", "light", "square", "staircase", "star", "stomach", "sun", "sunglasses", "surveyor", "swimming", "pool", "sword", "table", "tapestry", "teeth", "telescope", "television", "tennis", "racquet", "thermometer", "tiger", "toilet", "tongue", "torch", "torpedo", "train", "treadmill", "triangle", "tunnel", "typewriter", "umbrella", "vacuum", "vampire", "videotape", "vulture", "water", "weapon", "web", "wheelchair", "window", "woman", "worm"];


class Target {
  constructor() {
    this.target = words[Math.floor(Math.random() * words.length)];

    this.screenWidth = 900;
    this.x = Math.random() * (this.screenWidth - 200) + 100;
    this.y = 0;

    this.solved = false;
    this.speed = 20;
    this.paused = false;

    this.drop();

  }

  drop() {
    const fallSpeed = setInterval(() => {
      if (!this.paused) {
        this.y += 1.5;
      }
    }, this.speed);
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Target);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map