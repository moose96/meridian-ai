import Pizzicato from 'pizzicato';

import SoundEngineObject from '../../base/SoundEngineObject';

const generateFrequencies = (size) => {
  let frequencies = []

  for (let i = 0; i < size; i++) {
    frequencies.push(31.25 * 2 ** (i / 10));
  }

  return Float32Array.from(frequencies);
}

class Equalizer extends SoundEngineObject
{
  #frequencies;

  constructor(initObject) {
    super(initObject);

    this.source = Pizzicato.context.createGain();

    initObject.effects.forEach(effect => {
      this.addEffect(Equalizer.createFilter(effect));
    });

    this.#frequencies = generateFrequencies(95);
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

  getFrequencyResponse() {
    const magnitudes = [];

    this.filters.forEach(filter => {
      let magnitude = new Float32Array(this.#frequencies.length);
      const phase = new Float32Array(this.#frequencies.length);
      filter.getFrequencyResponse(this.#frequencies, magnitude, phase);
      magnitudes.push(magnitude);
    });

    //multiply magnitude values from all filters
    return magnitudes.reduce((prev, current) => prev.map((value, index) => value * current[index]));
  }

  toPlainObject() {
    return {
      filters: this.filters.map(filter => Equalizer.plainFilter(filter)),
      frequencies: this.#frequencies,
      frequencyResponse: this.getFrequencyResponse()
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