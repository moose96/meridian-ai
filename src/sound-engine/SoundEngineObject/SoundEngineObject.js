import Randomization from '../Randomization';
import Pizzicato from 'pizzicato';

class SoundEngineObject extends Randomization
{
  source;
  #gainNode;
  #destination;
  outputNode;
  #panner;
  #muted;
  #effects;

  constructor(initObject) {
    super(initObject.randomization);
    // this.source = source;
    this.#gainNode = Pizzicato.context.createGain();
    this.#gainNode.gain.value = initObject.volume ? initObject.volume : 1;

    this.#panner = new Pizzicato.Effects.StereoPanner({
      pan: initObject.pan ? initObject.pan : 0.0
    });

    this.outputNode = this.#panner;
    this.#panner.connect(this.#gainNode);

    this.#muted = false;
    this.#effects = [];
  }

  _connectSource(destination) {
    //this.source.connect(destination);
  }

  _disconnectSource() {
    //this.source.disconnect();
  }

  connect(destination) {
    this.#destination = this.#gainNode.connect(destination);
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
      this.disconnect();
      this.#muted = true;
    } else {
      this.connect(this.#destination);
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

  }
}

export default SoundEngineObject;