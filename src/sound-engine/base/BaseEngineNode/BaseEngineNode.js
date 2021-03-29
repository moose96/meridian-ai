import Pizzicato from 'pizzicato';

import SoundEngineObject from '../SoundEngineObject';

class BaseEngineNode extends SoundEngineObject
{
  type;
  source;

  constructor(initObject) {
    super(initObject);
    this.type = this.constructor.name;
  }

  _setAudioParam(audioParam, value, processor) {
    const _getValue = value => {
      if (!isFinite(value) || isNaN(value)) {
        return 0;
      } else if (processor instanceof Function) {
        return processor(value);
      } else {
        return value;
      }
    }

    if (audioParam instanceof AudioParam) {
      let time = Pizzicato.context.currentTime;
      let processedValue;

      // console.log('setting audo param', value);

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
}

export default BaseEngineNode;