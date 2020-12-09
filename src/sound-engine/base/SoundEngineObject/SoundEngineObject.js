import Pizzicato from 'pizzicato';
import { v4 as uuidv4 } from 'uuid';

import RandomizationList from '../Randomization/RandomizationList';


// import createEffect from '../../effects/createEffect';

/*
This is a base class for sound engine objects.

initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean
}
*/

class SoundEngineObject
{
  id;
  type;
  source;
  #gainNode;
  outputNode;
  #panNode;
  #muted;
  #randomization;
  effects = [];
  #redux = {
    store: null,
    curves: []
  };
  curves = [];

  constructor(initObject) {
    this.id = uuidv4();
    this.type = this.constructor.name;
    this.#randomization = new RandomizationList(initObject.randomization, this);
    this.#gainNode = Pizzicato.context.createGain();
    this.#gainNode.gain.value = initObject.volume ? initObject.volume : 1;

    this.#panNode = new Pizzicato.Effects.StereoPanner({
      pan: initObject.pan ? initObject.pan : 0.0
    });

    this.outputNode = this.#panNode;
    this.#panNode.connect(this.#gainNode);

    this.#muted = initObject.muted ? initObject.muted : false;
    this.curves = initObject.curves ? initObject.curves : [];
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

  _setAudioParam(audioParam, value) {
    let _value;
    let _time = 0;

    if (typeof value === 'number') {
      _value = parseFloat(value);
    } else if (typeof value === 'object') {
      _value = value.value;
      _time = value.time;
    } else {
      throw Error('Invalid value type');
    }

    console.log(audioParam, value);

    if (audioParam instanceof AudioParam) {
      audioParam.linearRampToValueAtTime(_value, Pizzicato.context.currentTime + _time);
    } else {
      // throw Error('audioParam must be an instance of AudioParam');
      console.log('error audio param');
    }
  }

  get volume() {
    return this.#gainNode.gain.value;
  }

  set volume(volume) {
    if (!isNaN(volume)) {
      this._setAudioParam(this.#gainNode.gain, volume);
    }
  }

  get muted() {
    return this.#muted;
  }

  set muted(muted) {
    if (muted) {
      this.#panNode.disconnect(this.#gainNode);
      this.#muted = true;
    } else {
      this.#panNode.connect(this.#gainNode);
      this.#muted = false;
    }
  }

  get pan() {
    return this.#panNode.pan;
  }

  set pan(pan) {
    // this.#panNode.pan = parseFloat(pan);
    this._setAudioParam(this.#panNode.pan, pan);
  }

  _connectEffects() {
    const _getNodeByType = effect => {
      if (effect instanceof SoundEngineObject) {
        return effect.source;
      } else if (effect instanceof AudioNode) {
        return effect;
      }
    };

    this._disconnectEffects();
    this._connectSource(_getNodeByType(this.effects[0]));

    this.effects.forEach((effect, index) => {
      if (index >= this.effects.length - 1) {
        effect.connect(this.outputNode);
      } else {
        effect.connect(_getNodeByType(this.effects[index + 1]));
      }
    });
  }

  _disconnectEffects() {
    this._disconnectSource();
    this.effects.forEach(effect => effect.disconnect());
  }

  addEffect(effect) {
    this.effects.push(effect);
    this._connectEffects();
  }

  removeEffect(effect) {
    const index = this.effects.indexOf(effect);
    delete this.effects[index];
    this._connectEffects();
  }

  play() {
    this.#randomization.randomize();
  }

  stop() {
    throw Error('This method should be overridden by child class');
  }

  toPlainObject() {
    return {
      randomization: this.#randomization.toPlainObject(),
      id: this.id,
      type: this.type,
      name: this.name,
      volume: this.volume,
      pan: this.pan,
      effects: this.effects.map(effect => effect.toPlainObject())
    };
  }

  curvesListener = () => {
    const linear = (min, max, x) => {
      return ((max - min) / 100.0) * x + min;
    }

    const curves = this.#redux.store.getState().soundEngine.globalCurves;

      if (this.#redux.curves !== curves) {
        this.curves.forEach(curve => {
          const { id, key, min, max} = curve;
          this[key] = linear(min, max, curves[id]);
        });
        this.#redux.curves = curves;
      }
  }

  setReduxStore(reduxStore) {
    this.#redux.store = reduxStore;
    this.#redux.store.subscribe(this.curvesListener);
  }
}

export default SoundEngineObject;