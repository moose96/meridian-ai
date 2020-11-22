import Pizzicato from 'pizzicato';

import SoundEngineObject from '../../base/SoundEngineObject';

class Equalizer extends SoundEngineObject
{
  _connectSource(destination) {
    this.source.connect(destination);
  }

  _disconnectSource() {
    this.source.disconnect();
  }

  get filters() {
    return this.effects;
  }

  set filters(filters) {
    this.effects = filters;
    this._connectEffects();
  }

  static createFilter(type) {
    return new BiquadFilterNode(Pizzicato.context, {type});
  }
}

export default Equalizer;