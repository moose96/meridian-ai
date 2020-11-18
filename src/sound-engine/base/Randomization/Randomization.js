class Randomization
{
  #randomizationInfo = {
    key: null,
    offset: 0
  };
  #randomizationEnabled = false;

  constructor(randomizationInfo) {
    if (randomizationInfo) {
      this.#randomizationInfo = randomizationInfo;
      this.#randomizationEnabled = true;
    }
  }

  get randomization() {
    return this.#randomizationInfo;
  }

  set randomization(randomization) {
    this.#randomizationInfo = randomization;
    this.#randomizationEnabled = true;
  }

  addRandomization(key, offset) {
    this.#randomizationInfo.key = key;
    this.#randomizationInfo.offset = offset;
    this.#randomizationEnabled = true;
  }

  randomize() {
    if (this.#randomizationEnabled) {
      const key = this.#randomizationInfo.key;
      const top = this[key] + this.#randomizationInfo.offset;
      const bottom = this[key] - this.#randomizationInfo.offset;

      this[key] = Math.random() * (top - bottom) + bottom;
    }
  }

  toPlainObject() {
    return this.randomization;
  }
}

export default Randomization