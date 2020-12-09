const defaultObject = {
  enabled: true,
  key: '',
  offset: 0,
  value: 0,
  loop: false,
  time: 2000
}

class Randomization
{
  randomization = {};
  #started = false;
  #object;
  #intervalID;

  constructor(randomizationInfo, object) {
    if (randomizationInfo) {
      this.randomization = {...defaultObject, ...randomizationInfo};
    }

    this.#object = object;
  }

  setValue(name, value) {
    switch(name) {
      case 'key':
        this.randomization.key = value;
      break;
      case 'loop':
        this.randomization.loop = value;
      break;
      default:
        this.randomization[name] = parseFloat(value);
    }
  }

  randomize() {
    const { enabled, key, offset, value, loop, time } = this.randomization;

    if (enabled && (!loop || (loop && this.#started))) {
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
    return this.randomization;
  }
}

export default Randomization