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

  toPlainObject() {
    return {
      filters: this.filters.map(filter => Equalizer.plainFilter(filter))
    }
  }

  static createFilter(type) {
    if (typeof(type) === 'string') {
      return new BiquadFilterNode(Pizzicato.context, {type});
    } else if (typeof(type) === 'object') {
      return new BiquadFilterNode(Pizzicato.context, type);
    }
  }

  static plainFilter({ type, frequency, gain, Q }) {
    return {
      type,
      frequency: frequency.value,
      gain: gain.value,
      Q: Q.value
    }
  }
}

export default Equalizer;