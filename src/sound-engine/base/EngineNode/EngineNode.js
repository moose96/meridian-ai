import Pizzicato from 'pizzicato';
import { v4 as uuidv4 } from 'uuid';

import BaseEngineNode from '../BaseEngineNode';
import ParamListener from '../ParamListener';

const defaultObject = {
  id: uuidv4(),
  randomization: [],
  volume: 1,
  pan: 0.0,
  muted: false,
  params: []
}

class EngineNode extends BaseEngineNode
{
  id;
  #gainNode;
  outputNode;
  #panNode;
  #muted;
  effects = [];

  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);
    this.id = initObject.id;
    this.type = this.constructor.name;
    this.#gainNode = Pizzicato.context.createGain();
    this.#gainNode.gain.value = initObject.volume;

    this.#panNode = new StereoPannerNode(Pizzicato.context, {
      pan: initObject.pan
    });

    this.outputNode = this.#panNode;
    this.#panNode.connect(this.#gainNode);

    this.#muted = initObject.muted;
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

  // _setAudioParam(audioParam, value, processor) {
  //   const _getValue = value => {
  //     if (!isFinite(value) || isNaN(value)) {
  //       return 0;
  //     } else if (processor instanceof Function) {
  //       return processor(value);
  //     } else {
  //       return value;
  //     }
  //   }

  //   if (audioParam instanceof AudioParam) {
  //     let time = Pizzicato.context.currentTime;
  //     let processedValue;

  //     if (typeof value === 'number') {
  //       processedValue = _getValue(value);
  //     } else if (typeof value === 'object') {
  //       processedValue = _getValue(value.value);
  //       time += value.time / 1000;
  //     } else {
  //       throw Error('value has to be a number or object');
  //     }

  //     audioParam.linearRampToValueAtTime(processedValue, time);
  //     console.log(this.name, audioParam, processedValue, value.time);
  //   } else {
  //     throw Error('audioParam has to be an instance of AudioParam');
  //   }
  // }

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
      if (effect instanceof BaseEngineNode || effect instanceof EngineNode) {
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
      ...super.toPlainObject(),
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

  setParamStore(store) {
    super.setParamStore(store);
    this.effects.forEach(effect => {
      if (effect instanceof ParamListener) {
        effect.setParamStore(store);
      }
    })
  }
}

export default EngineNode;