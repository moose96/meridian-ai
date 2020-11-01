import Pizzicato from 'pizzicato';
import Randomizer from '../Randomizer';

import store from '../../redux/store';
import { addCurrentVoices, subCurrentVoices } from '../redux';

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
    this.id = Math.floor(Math.random() * 200);
    this.muted = false;

    this.key = initObject.randomization.key;
    this.randomizer = new Randomizer(initObject.randomization.value, initObject.randomization.offset);

    this.panner = new Pizzicato.Effects.StereoPanner({
      pan: 0.0
    });

    this.addEffect(this.panner);

    this.on('play', () => {
      store.dispatch(addCurrentVoices());
      console.log('play', initObject.filename, 'pan', this.panner.pan, 'volume', this.volume);
    });
    this.on('end', () => {
      store.dispatch(subCurrentVoices());
      console.log('end', initObject.filename);
    });
  }

  setPan = newPan => {
    this.panner.pan = newPan;
  }

  setVolume = volume => {
    this.volume = volume;
  }

  setDelay = delay => {
    this.delay = delay;
  }

  setOffset = offset => {
    this.offset = offset;
  }

  setMuted(muted) {
    this.muted = muted;
  }

  addRandomization = (key, randomizer) => {
    this.key = key;
    this.randomizer = randomizer;
  }

  _play = (delay, offset) => {
    if (!this.muted) {
      const _delay = delay ? delay : this.delay;
      const _offset = offset ? offset : this.offset;

      this[this.key] = Randomizer.randomize(this.randomizer);
      super.play(_delay, _offset);
    }
  }
}

export default Sound;