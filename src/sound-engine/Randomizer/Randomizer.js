class Randomizer
{
  constructor(value, offset) {
    this.value = value;
    this.offset = offset;
  }

  static randomize = (randomizer) => {
    const top = randomizer.value + randomizer.offset;
    const bottom = randomizer.value - randomizer.offset;

    return Math.floor(Math.random() * top + bottom);
  }
}

export default Randomizer;