import Pizzicato from 'pizzicato';
import Randomization from '../Randomization';

import store from '../../redux/store';
import { addCurrentVoices, subCurrentVoices } from '../redux';

class Sound extends Pizzicato.Sound
{
  #panner;
  muted = false;
  offset = 0;
  delay = 0;

  constructor(initObject, _function) {
    super(initObject.filename, () => {
      this.sourceNode = this.getSourceNode();
      // this.sourceNode.detune.value = -1200;
      // this.sourceNode.playbackRate.value = 0.5;

      if (_function) {
        _function();
      }

      if (this.onLoad) {
        this.onLoad();
      }
    });

    console.log(Randomization.prototype);

    this.#panner = new Pizzicato.Effects.StereoPanner({
      pan: 0.0
    });

    this.addEffect(this.#panner);

    if (initObject.randomization) {
      this.addRandomization(initObject.randomization.key, initObject.randomization.offset);
    }

    this.on('play', () => {
      store.dispatch(addCurrentVoices());
      console.log('play', initObject.filename, 'pan', this.pan, 'volume', this.volume, "tune", this.detune);
    });
    this.on('end', () => {
      store.dispatch(subCurrentVoices());
      console.log('end', initObject.filename);
    });
  }

  onLoad() {
    console.log(this.detune);
  }

  get pan() {
    return this.#panner.pan;
  }

  set pan(newPan) {
    this.#panner.pan = newPan;
  }

  setPan(newPan) {
    this.#panner.pan = newPan;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  setDelay(delay) {
    this.delay = delay;
  }

  setOffset(offset) {
    this.offset = offset;
  }

  setMuted(muted) {
    this.muted = muted;
  }

  // setLength = length => {
  //   const buffer = this.sourceNode.buffer;
  //   let newBuffer = Pizzicato.context.createBuffer(buffer.numberOfChannels, (length * buffer.sampleRate) / 1000, buffer.sampleRate);
  //   let data = newBuffer.getChannelData(0);
  //   data = buffer.getChannelData(0).slice(0, (length * buffer.sampleRate) / 1000);
  //   this.sourceNode.buffer = newBuffer;
  // }

  // get detune() {
  //   const sourceNode = this.getSourceNode();
  //   // return sourceNode.detune.value;
  //   return this.sourceNode.detune.value;
  // }

  // setDetune(detune) {
  //   const sourceNode = this.getRawSourceNode();
  //   sourceNode.detune.value = detune;
  //   // console.log(sourceNode);
  // }

  play(delay, offset) {
    if (!this.muted) {
      const _delay = delay ? delay : this.delay;
      const _offset = offset ? offset : this.offset;

      // this.randomize();
      super.play(_delay, _offset);
    }
  }
}

Object.assign(Sound.prototype, Randomization.prototype);

export default Sound;