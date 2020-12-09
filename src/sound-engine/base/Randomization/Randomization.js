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

    if (enabled && (!loop || (loop && this.#started)) {
      const top = value + offset;
      const bottom = value - offset;

      this.#object[key] = {
        value: Math.random() * (top - bottom) + bottom,
        time: loop ? time : 0
      };
    }
  }

  start() {
    if (this.randomization.loop) {
      this.#intervalID = setInterval(this.randomize, this.randomization.time);
      this.#started = true;
    }
  }

  stop() {
    if (this.randomization.loop) {
      clearInterval(this.#intervalID);
      this.#started = false;
    }
  }

  toPlainObject() {
    return {
      randomization: this.randomization
    };
  }
}

export default Randomization