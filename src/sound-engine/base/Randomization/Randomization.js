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
  #started = false;
  #object;
  #audioParams;
  #intervalID;

  constructor(_initObject, object) {
    const initObject = {...defaultObject, ..._initObject};

    super(initObject);
    this.enabled = initObject.enabled;
    this.key = initObject.key;
    this.offset = initObject.offset;
    this.value = initObject.value;
    this.loop = initObject.loop;
    this.time = initObject.time;

    this.#object = object;
    this.#audioParams = object.getKeysOfAudioParams();
  }

  setValue(name, value) {
    switch(name) {
      case 'key':
        this.key = value;
      break;
      case 'loop':
        this.loop = value;
      break;
      default:
        this[name] = parseFloat(value);
    }
  }

  randomizeRunner = () => {
    if (this.enabled && (!this.loop || (this.loop && this.#started))) {
      const top = this.value + this.offset;
      const bottom = this.value - this.offset;
      const _value = Math.random() * (top - bottom) + bottom;

      if (this.#audioParams.indexOf(this.key) !== -1) {
        this.#object[this.key] = {
          value: _value,
          time: this.loop ? this.time : 0
        };
      } else {
        this.#object[this.key] = this.value;
      }
    }
  }

  randomize() {
    if (this.loop && !this.#started) {
      this.#intervalID = setInterval(this.randomizeRunner, this.time);
      this.#started = true;
    } else {
      this.randomizeRunner();
    }
  }

  stop() {
    if (this.loop && this.#started) {
      clearInterval(this.#intervalID);
      this.#started = false;
    }
  }

  toPlainObject() {
    return {
      enabled: this.enabled,
      key: this.key,
      offset: this.offset,
      value: this.value,
      loop: this.loop,
      time: this.time
    }
  }
}

export default Randomization