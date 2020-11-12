import Randomization from '../Randomization';
import Pizzicato from 'pizzicato';

/*
This is a base class for sound engine objects.

initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean
}
*/

class SoundEngineObject extends Randomization
{
  source;
  #gainNode;
  outputNode;
  #panner;
  #muted;
  #effects;

  constructor(initObject) {
    super(initObject.randomization);
    this.#gainNode = Pizzicato.context.createGain();
    this.#gainNode.gain.value = initObject.volume ? initObject.volume : 1;

    this.#panner = new Pizzicato.Effects.StereoPanner({
      pan: initObject.pan ? initObject.pan : 0.0
    });

    this.outputNode = this.#panner;
    this.#panner.connect(this.#gainNode);

    this.#muted = initObject.muted ? initObject.muted : false;
    this.#effects = [];
  }

  _connectSource(destination) {
    throw Error('This method should be overridden by child class');
  }

  _disconnectSource() {
    throw Error('This method should be overridden by child class');
  }

  connect(destination) {
    this.#gainNode.connect(destination);
  }

  disconnect() {
    this.#gainNode.disconnect();
  }

  get volume() {
    return this.#gainNode.gain;
  }

  set volume(volume) {
    if (volume >= 0 && volume <= 1) {
      this.#gainNode.gain.value = volume;
    }
  }

  get muted() {
    return this.#muted;
  }

  set muted(muted) {
    if (muted) {
      this.#panner.disconnect();
      this.#muted = true;
    } else {
      this.#panner.connect(this.#gainNode);
      this.#muted = false;
    }
  }

  get pan() {
    return this.#panner.pan;
  }

  set pan(pan) {
    this.#panner.pan = pan;
  }

  _connectEffects() {
    this._disconnectEffects();
    this._connectSource(this.#effects[0]);

    this.#effects.forEach((effect, index) => {
      if (index >= this.#effects.length - 1) {
        effect.connect(this.outputNode);
      } else {
        effect.connect(this.#effects[index + 1]);
      }
    });
  }

  _disconnectEffects() {
    this._disconnectSource();
    this.#effects.forEach(effect => effect.disconnect());
  }

  addEffect(effect) {
    this.#effects.push(effect);
    this._connectEffects();
  }

  removeEffect(effect) {
    const index = this.#effects.indexOf(effect);
    delete this.#effects[index];
    this._connectEffects();
  }

  play() {
    this.randomize();
  }

  stop() {
    throw Error('This method should be overridden by child class');
  }
}

export default SoundEngineObject;