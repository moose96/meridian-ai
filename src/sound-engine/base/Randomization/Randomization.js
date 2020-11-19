class Randomization
{
  randomization = [];

  constructor(randomizationInfo) {
    if (randomizationInfo) {
      this.randomization = randomizationInfo.map(info => ({...info, enabled: true}));
    }
  }

  // addRandomization(key, offset) {
  //   this.#randomizationInfo.key = key;
  //   this.#randomizationInfo.offset = offset;
  //   this.#randomizationEnabled = true;
  // }

  randomize() {
    this.randomization.forEach(randomization => {
      const { enabled, key, offset, value } = randomization;

      if (enabled) {
        const top = value + offset;
        const bottom = value - offset;

        this[key] = Math.random() * (top - bottom) + bottom;
      }
    });
  }

  toPlainObject() {
    return {
      randomization: this.randomization
    };
  }
}

export default Randomization