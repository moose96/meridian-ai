import ParamListener from "../ParamListener";

const defaultObject = {
  enabled: true,
  key: '',
  offset: 0,
  value: 0,
  loop: false,
  time: 2000,
  params: []
}

class Randomization extends ParamListener
{
  randomization = {};
  #started = false;
  #object;
  #audioParams;
  #intervalID;

  constructor(_randomizationInfo, object) {
    const randomizationInfo = {...defaultObject, ..._randomizationInfo};

    super(randomizationInfo);
    this.randomization = {...defaultObject, ...randomizationInfo};

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

  randomizeRunner = () => {
    const { enabled, key, offset, value, loop, time } = this.randomization;

    if (enabled && (!loop || (loop && this.#started))) {
      const top = value + offset;
      const bottom = value - offset;
      const _value = Math.random() * (top - bottom) + bottom;

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

  randomize() {
    if (this.randomization.loop && !this.#started) {
      this.#intervalID = setInterval(this.randomizeRunner, this.randomization.time);
      this.#started = true;
    } else {
      this.randomizeRunner();
    }
  }

  stop() {
    if (this.randomization.loop && this.#started) {
      clearInterval(this.#intervalID);
      this.#started = false;
    }
  }

  toPlainObject() {
    return this.randomization;
  }
}

export default Randomization