import Pizzicato from 'pizzicato';

import Randomization from '../Randomization';

class RandomParameterGenerator extends Randomization
{
  #time;
  #intervalID;

  constructor(initObject) {
    super(initObject.randomization);

    this.#time = initObject.time;
  }

  randomize() {
    this.randomization.forEach(randomization => {
      const { enabled, key, offset, value } = randomization;

      if (enabled) {
        const top = value + offset;
        const bottom = value - offset;

        const field = this.getRawNode(key);
        field.linearRampToValueAtTime(Math.random() * (top - bottom) + bottom, Pizzicato.context.currentTime + this.#time * 1000);
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