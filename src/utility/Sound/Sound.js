import Pizzicato from 'pizzicato';
import Randomizer from '../Randomizer';

class Sound extends Pizzicato.Sound {
  // constructor(description, _function) {
  //   super(description, _function);

  //   this.panner = new Pizzicato.Effects.StereoPanner({
  //     pan: 0.0
  //   });

  //   this.addEffect(this.panner);
  // }

  constructor(initObject, _function) {
    super(initObject.filename, _function);

    this.key = initObject.randomization.key;
    this.randomizer = new Randomizer(initObject.randomization.value, initObject.randomization.offset);

    this.panner = new Pizzicato.Effects.StereoPanner({
      pan: 0.0
    });

    this.addEffect(this.panner);

    this.on('play', () => console.log('play', initObject.filename, 'pan', this.panner.pan));
    this.on('end', () => console.log('end', initObject.filename, 'pan', this.panner.pan));
  }

  setPan = newPan => {
    this.panner.pan = newPan;
  }

  setDelay = delay => {
    this.delay = delay;
  }

  setOffset = offset => {
    this.offset = offset;
  }

  addRandomization = (key, randomizer) => {
    this.key = key;
    this.randomizer = randomizer;
  }

  _play = (delay, offset) => {
    const _delay = delay ? delay : this.delay;
    const _offset = offset ? offset : this.offset;

    this[this.key] = Randomizer.randomize(this.randomizer);
    super.play(_delay, _offset);
  }
}

export default Sound;