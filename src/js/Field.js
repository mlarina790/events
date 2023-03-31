import genPosition from './generators';

export default class Field {
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
