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
  #audioParams;
  #intervalID;

  constructor(randomizationInfo, object) {
    if (randomizationInfo) {
      this.randomization = {...defaultObject, ...randomizationInfo};
    }

    this.#object = object;
    this.#audioParams = object.getKeysOfAudioParams();
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
      const _value = Math.random() * (top - bottom) + bottom

      if (this.#audioParams.indexOf(key) !== -1) {
        this.#object[key] = {
          value: _value,
          time: loop ? time : 0
        };
      } else {
        this.#object[key] = value;
      }
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