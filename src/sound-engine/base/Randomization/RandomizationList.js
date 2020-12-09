import Randomization from './Randomization';

class RandomizationList
{
  randomization = [];
  #object;

  constructor(initObject, object) {
    if (initObject?.length > 0) {
      this.randomization = initObject.map(init => new Randomization(init, object));
    }

    this.#object = object;
  }

  addRandomization() {
    this.randomization.push(new Randomization({
      key: 'volume',
      value: 0,
      offset: 0,
      loop: false,
      time: 0
    }, this.#object));
  }

  deleteRandomization(index) {
    this.randomization.splice(index, 1);
  }

  randomize() {
    this.randomization.forEach(randomization => randomization.randomize());
  }

  toPlainObject() {
    return this.randomization.map(randomization => randomization.toPlainObject());
  }
}

export default RandomizationList;