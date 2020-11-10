class Randomization
{
  #randomizationInfo = {
    value: null,
    offset: 0
  };
  #randomizationEnabled = false;

  constructor(randomizationInfo) {
    if (randomizationInfo) {
      this.#randomizationInfo = randomizationInfo;
      this.#randomizationEnabled = true;
    }
  }

  addRandomization(key, offset) {
    this.#randomizationInfo.key = key;
    this.#randomizationInfo.offset = offset;
    this.#randomizationEnabled = true;
  }

  // getValue() {
  //   const matches = this.#randomizationInfo.key.match(/(\w+)/g);
  //   let value = this;
  //   matches.forEach(match => value = value[match]);
  //   return value;
  // }

  randomize() {
    if (this.#randomizationEnabled) {
      // let value = this.getValue();
      const key = this.#randomizationInfo.key;
      const top = this[key] + this.#randomizationInfo.offset;
      const bottom = this[key] - this.#randomizationInfo.offset;

      // value = Math.random() * (top - bottom) + bottom;
      this[key] = Math.random() * (top - bottom) + bottom;
    }
  }
}

export default Randomization