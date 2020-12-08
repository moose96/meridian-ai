import Pizzicato from 'pizzicato';

import Randomization from '../Randomization';

class RandomParameterGenerator extends Randomization
{
  #time;
  #intervalID;
  #object;

  constructor(initObject, object) {
    super(initObject.randomization);

    this.#time = initObject.time;
    this.#object = object;
  }

  randomize() {
    this.randomization.forEach(randomization => {
      const { enabled, key, offset, value } = randomization;

      if (enabled) {
        const top = value + offset;
        const bottom = value - offset;
        const _value = Math.random() * (top - bottom) + bottom;

        this.#object[key] = { value: _value, time: this.#time };
      }
    })
  }

  start() {
    this.#intervalID = setInterval(this.randomize, this.#intervalID);
  }

  stop() {
    clearInterval(this.#intervalID);
  }

  get time() {
    return this.#time;
  }

  set time(time) {
    this.stop();
    this.#time = time;
    this.start();
  }
}

export default RandomParameterGenerator;