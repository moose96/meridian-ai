import Pizzicato from 'pizzicato';

import SoundEngineObject from '../../base/SoundEngineObject';

class Equalizer extends SoundEngineObject
{
  constructor(initObject) {
    super(initObject);

    this.source = Pizzicato.context.createGain();

    initObject.effects.forEach(effect => {
      this.addEffect(Equalizer.createFilter(effect));
    });
  }

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
    if (typeof(type) === 'string') {
      return new BiquadFilterNode(Pizzicato.context, {type});
    } else if (typeof(type) === 'object') {
      return new BiquadFilterNode(Pizzicato.context, type);
    }
  }
}

export default Equalizer;