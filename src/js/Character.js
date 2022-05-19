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

function getDirectionUnit (direction) {
  if (direction === DIRECTIONS.LEFT) {
    return -1;
  } else if (direction === DIRECTIONS.RIGHT) {
    return 1;
  } else {
    return 0;
  }
}

export class Character {
  #mainElem;
  #xPos;
  #speed;
  #lastScrollTop = 0;
  #lastDirection = null;
  #DELAY = 500;
  #runningTimer = null;
  #moveRaf = null;
  #isMoving = false;
  #minXPos = 2;
  #maxXPos = 88;
  
  constructor({xPos, speed = 0.3}) {
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

    this.#speed = speed;
    this.#setCharacterXPos(xPos);
    this.#init();
    
    document.querySelector('.stage').appendChild(this.#mainElem);
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
      if ((key !== KEYS.ArrowLeft && key !== KEYS.ArrowRight) || this.#isMoving) {
        return;
      }

      this.#isMoving = true;

      if (key === KEYS.ArrowLeft) {
        this.#setDirection(DIRECTIONS.LEFT);
      } else if (key === KEYS.ArrowRight) {
        this.#setDirection(DIRECTIONS.RIGHT);
      }
      this.#setRunning(true);
      this.#move();
    });

    window.addEventListener('keyup', () => {
      this.#setRunning(false);
      this.#clearMoveRaf();
      this.#isMoving = false;
    });
  }

  #setCharacterXPos(xPos) {
    this.#xPos = xPos;
    if (this.#xPos < this.#minXPos) {
      this.#xPos = this.#minXPos;
    } else if (this.#xPos > this.#maxXPos) {
      this.#xPos = this.#maxXPos;   
    } 
    this.#mainElem.style.left = `${this.#xPos}%`;
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

  #clearMoveRaf() {
    if (this.#moveRaf) {
      cancelAnimationFrame(this.#moveRaf);
      this.#moveRaf = null;
    }
  }

  #setDirection(direction) {
    if (this.#lastDirection !== direction) {
      this.#mainElem.dataset.direction = direction;
      this.#lastDirection = direction;
    }
  }

  #move() {
    this.#setCharacterXPos(this.#xPos + (getDirectionUnit(this.#lastDirection) * this.#speed));
    this.#moveRaf = requestAnimationFrame(() => this.#move());
  }
}
