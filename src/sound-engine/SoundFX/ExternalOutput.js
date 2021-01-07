import Pizzicato from 'pizzicato';

import BaseEngineNode from '../base/BaseEngineNode';

const defaultObject = {
  randomization: [],
  params: [],
  gain: 0.0
};

class ExternalOutput extends BaseEngineNode
{
  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);
    this.source = Pizzicato.context.createGain();
    this.source.gain.value = 0.0;
  }

  get gain() {
    return this.source.gain.value;
  }

  set gain(gain) {
    this._setAudioParam(this.source.gain, gain);
  }

  connect(destination) {
    this.source.connect(destination);
  }

  disconnect() {
    this.source.disconnect();
  }

  getKeysOfAudioParams() {
    return ['gain'];
  }
}

export default ExternalOutput;