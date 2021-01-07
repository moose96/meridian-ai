import Pizzicato from 'pizzicato';

import BaseEngineNode from '../../base/BaseEngineNode';

const defaultObject = {
  type: 'highpass',
  frequency: 8000,
  gain: 0.0,
  Q: 1.0
};

class Filter extends BaseEngineNode
{
  type = 'Filter';

  constructor(_initObject) {
    let initObject;
    if (typeof _initObject === 'string') {
      initObject = {...defaultObject, type: _initObject};
    } else if (typeof _initObject === 'object') {
      initObject = {...defaultObject, ..._initObject};
    } else {
      initObject = {...defaultObject};
    }

    super(initObject);

    this.source = new BiquadFilterNode(Pizzicato.context, initObject);
  }

  connect(destination) {
    this.source.connect(destination);
  }

  disconnect() {
    this.source.disconnect();
  }

  get filterType() {
    return this.source.type;
  }

  set filterType(type) {
    this.source.type = type;
  }

  get frequency() {
    return this.source.frequency.value;
  }

  set frequency(frequency) {
    this._setAudioParam(this.source.frequency, frequency);
  }

  get gain() {
    return this.source.gain.value;
  }

  set gain(gain) {
    this._setAudioParam(this.source.gain, gain);
  }

  get Q() {
    return this.source.Q.value;
  }

  set Q(Q) {
    this._setAudioParam(this.source.Q, Q);
  }

  getFrequencyResponse(frequencyArray, magResponseOutput, phaseResponseOutput) {
    return this.source.getFrequencyResponse(frequencyArray, magResponseOutput, phaseResponseOutput);
  }

  getKeysOfAudioParams() {
    return ['frequency', 'gain', 'Q'];
  }

  toPlainObject() {
    return {
      type: this.filterType,
      frequency: this.frequency,
      gain: this.gain,
      Q: this.Q
    }
  }
}

export default Filter;