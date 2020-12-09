class Randomization
{
  randomization = {};
  #started = false;
  #object;
  #intervalID;

  constructor(randomizationInfo, object) {
    if (randomizationInfo) {
      this.randomization = {...randomizationInfo, enabled: true }
    }

    this.#object = object;
  }

  randomize() {
    const { enabled, key, offset, value, loop, time } = this.randomization;

    if ((enabled && !loop) || (enabled && loop && this.#started)) {
      const top = value + offset;
      const bottom = value - offset;

      this.#object[key] = {
        value: Math.random() * (top - bottom) + bottom,
        time: loop ? time : 0
      };
    }
  }

  start() {
    this.#intervalID = setInterval(this.randomize, this.randomization.time);
    this.#started = true;
  }

  stop() {
    clearInterval(this.#intervalID);
    this.#started = false;
  }

  toPlainObject() {
    return {
      randomization: this.randomization
    };
  }
}

export default Randomization