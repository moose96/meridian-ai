class Randomization
{
  randomization = [];

  constructor(randomizationInfo) {
    if (randomizationInfo) {
      this.randomization = randomizationInfo.map(info => ({...info, enabled: true}));
    }
  }

  addRandomization() {
    this.randomization.push({
      enabled: true,
      key: 'volume',
      offset: 0,
      value: 0
    });
  }

  deleteRandomization(index) {
    this.randomization.splice(index, 1);
  }

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