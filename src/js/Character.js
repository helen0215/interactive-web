const CHARACTER_STYLES = {
  CHARACTER: 'character',
  RUNNING: 'running',
};

const DIRECTIONS = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
  LEFT: 'left',
  RIGHT: 'right'
}

const KEYS = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight'
};

export class Character {
  #mainElem;
  #lastScrollTop = 0;
  #lastDirection = null;
  #DELAY = 500;
  #runningTimer = null;
  
  constructor({xPos}) {
    this.#mainElem = document.createElement('div');
    this.#mainElem.classList.add(CHARACTER_STYLES.CHARACTER);
    this.#mainElem.innerHTML = 
    `<div class="character-face-con character-head">
      <div class="character-face character-head-face face-front"></div>
      <div class="character-face character-head-face face-back"></div>
    </div>
    <div class="character-face-con character-torso">
      <div class="character-face character-torso-face face-front"></div>
      <div class="character-face character-torso-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-right">
      <div class="character-face character-arm-face face-front"></div>
      <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-left">
      <div class="character-face character-arm-face face-front"></div>
      <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-right">
      <div class="character-face character-leg-face face-front"></div>
      <div class="character-face character-leg-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-left">
      <div class="character-face character-leg-face face-front"></div>
      <div class="character-face character-leg-face face-back"></div>
    </div>`;

    this.#mainElem.style.left = `${xPos}%`;
    document.querySelector('.stage').appendChild(this.#mainElem);
    this.#init();
  }

  #init() {
    window.addEventListener('scroll', () => {
      const diff = this.#lastScrollTop - window.pageYOffset;
      const direction = diff > 0 ? DIRECTIONS.BACKWARD : DIRECTIONS.FORWARD;
      this.#setDirection(direction);
      this.#lastScrollTop = window.pageYOffset;      
      this.#setRunningTimer();
    });

    window.addEventListener('keydown', ({key}) => {
      if (key === KEYS.ArrowLeft) {
        this.#setDirection(DIRECTIONS.LEFT);
      } else if (key === KEYS.ArrowRight) {
        this.#setDirection(DIRECTIONS.RIGHT);
      }
      this.#setRunning(true);
    });

    window.addEventListener('keyup', () => {
      this.#setRunning(false);
    });
  }

  #setRunning(isRunning) {
    if (isRunning) {
      this.#mainElem.classList.add(CHARACTER_STYLES.RUNNING);
    } else {
      this.#mainElem.classList.remove(CHARACTER_STYLES.RUNNING);   
    }
  }

  #setRunningTimer() {
    this.#clearRunningTimer();

    if (!this.#runningTimer) {
      this.#setRunning(true);
    }

    this.#runningTimer = setTimeout(() => {
      this.#setRunning(false);
    }, this.#DELAY);
  }

  #clearRunningTimer() {
    if (this.#runningTimer) {
      clearTimeout(this.#runningTimer);
      this.#runningTimer = null;
    }
  }

  #setDirection(direction) {
    if (this.#lastDirection !== direction) {
      this.#mainElem.dataset.direction = direction;
      this.#lastDirection = direction;
    }
  }
}
