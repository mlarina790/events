/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Action.js
class Action {
  constructor(field) {
    this.field = field;
    this.scores = {
      vic: 0,
      loose: 0
    };
    this.checkTarget = this.checkTarget.bind(this);
  }
  init() {
    this.field.parentDiv.addEventListener('click', this.checkTarget);
    this.field.setActive();
    this.timerId = setInterval(() => {
      const gameOver = this.checkScores(false);
      if (gameOver) return;
      this.field.gameState(this.scores, '');
      this.field.setActive();
    }, 1000);
  }
  checkScores(clickEvent) {
    if (this.scores.loose >= 5 || this.scores.vic >= 5) {
      clearInterval(this.timerId);
      this.field.parentDiv.removeEventListener('click', this.checkTarget);
      this.field.gameState(this.scores, 'Игра окончена');
      return true;
    }
    if (!clickEvent) this.scores.loose += +1;else this.scores.loose -= 1;
    return false;
  }
  checkTarget(e) {
    if (e.target === this.field.img) {
      this.scores.vic += 1;
      this.field.removeImg();
      this.checkScores(true);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/generators.js
function genPosition(oldIndex) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
  } while (oldIndex === newIndex);
  return newIndex;
}
;// CONCATENATED MODULE: ./src/js/Field.js

class Field {
  constructor() {
    [this.img] = document.images;
    [this.parentDiv] = document.getElementsByClassName('wrapper');
    [this.gameStateDiv] = document.getElementsByClassName('gamestate');
    this.setActive = this.setActive.bind(this);
    this.oldIndex = null;
  }
  init() {
    this.img.parentElement.removeChild(this.img);
    this.createCells();
  }
  createCells() {
    for (let i = 0; i < 4 * 4; i += 1) {
      const div = document.createElement('div');
      this.parentDiv.appendChild(div);
    }
  }
  setActive() {
    if (document.images[0]) this.removeImg();
    const childDivs = this.parentDiv.children;
    const index = genPosition(this.oldIndex);
    this.oldIndex = index;
    childDivs[index].appendChild(this.img);
  }
  removeImg() {
    const activeDiv = document.images[0].parentElement;
    activeDiv.removeChild(this.img);
  }
  gameState(scores, status) {
    this.gameStateDiv.innerHTML = `
    <h3>${status}</h3>
    Попал: <strong>${scores.vic}</strong>, Промахнулся: <strong>${scores.loose}</strong> 
    `;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const field = new Field();
field.init();
const action = new Action(field);
action.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;