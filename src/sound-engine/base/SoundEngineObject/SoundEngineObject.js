import Pizzicato from 'pizzicato';
import { v4 as uuidv4 } from 'uuid';

import RandomizationList from '../Randomization/RandomizationList';

/*
This is a base class for sound engine objects.

initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean
}
*/

const defaultObject = {
  id: uuidv4(),
  randomization: [],
  volume: 1,
  pan: 0.0,
  muted: false,
  /** params
   * an array of objects:
   * {
   *  name: string,
   *  key: string,
   *  min: number,
   *  max: number
   * }
   */
  params: []
}

class SoundEngineObject
{
  id;
  type;
  source;
  #gainNode;
  outputNode;
  #panNode;
  #muted;
  effects = [];
  params = [];
  paramStore;

  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};
    this.id = uuidv4();
    this.type = this.constructor.name;
    this.randomization = new RandomizationList(initObject.randomization, this);
    this.#gainNode = Pizzicato.context.createGain();
    this.#gainNode.gain.value = initObject.volume;

    this.#panNode = new StereoPannerNode(Pizzicato.context, {
      pan: initObject.pan
    });

    this.outputNode = this.#panNode;
    this.#panNode.connect(this.#gainNode);

    this.#muted = initObject.muted;
    this.params = initObject.params;
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
    const _getValue = value => {
      if (!isFinite(value) || isNaN(value)) {
        return 0;
      } else {
        return value;
      }
    }

    if (audioParam instanceof AudioParam) {
      let time = Pizzicato.context.currentTime;
      let processedValue;

      if (typeof value === 'number') {
        processedValue = _getValue(value);
      } else if (typeof value === 'object') {
        processedValue = _getValue(value.value);
        time += value.time / 1000;
      } else {
        throw Error('value has to be a number or object');
      }

      audioParam.linearRampToValueAtTime(processedValue, time);
    } else {
      throw Error('audioParam has to be an instance of AudioParam');
    }
  }

  get volume() {
    return this.#gainNode.gain.value;
  }

  set volume(volume) {
    this._setAudioParam(this.#gainNode.gain, volume);
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
    return this.#panNode.pan.value;
  }

  set pan(pan) {
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
    this.randomization.randomize();
  }

  stop() {
    this.randomization.stop();
  }

  toPlainObject() {
    return {
      randomization: this.randomization.toPlainObject(),
      id: this.id,
      type: this.type,
      name: this.name,
      volume: this.volume,
      pan: this.pan,
      effects: this.effects.map(effect => effect.toPlainObject())
    };
  }

  getKeysOfAudioParams() {
    return ['volume', 'pan'];
  }

  paramListener = () => {
    const linear = (min, max, x) => {
      return ((max - min) / 100.0) * x + min;
    }

    const audioParams = this.getKeysOfAudioParams();
    const params = this.paramStore.getState();

    this.params.forEach(param => {
      const { name, key, min, max } = param;
      const value = params[name];

      if (value !== undefined) {
        if (params.gradual && audioParams.indexOf(key) !== -1) {
          this[key] = {
            value: linear(min, max, value),
            time: 5000
          };
        } else {
          this[key] = linear(min, max, value);
        }
      } else {
        console.warn(`${param.name} is ignored`);
      }
    })
  }

  setParamStore(store) {
    this.paramStore = store;
    this.paramStore.subscribe(this.paramListener);
  }
}

export default SoundEngineObject;