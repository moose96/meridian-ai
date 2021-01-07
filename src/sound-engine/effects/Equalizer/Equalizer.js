import Pizzicato from 'pizzicato';

// import SoundEngineObject from '../../base/SoundEngineObject';
import EngineNode from '../../base/EngineNode';
import Filter from './Filter';

const generateFrequencies = (size) => {
  let frequencies = []

  for (let i = 0; i < size; i++) {
    frequencies.push(31.25 * 2 ** (i / (size / 10)));
  }

  return Float32Array.from(frequencies);
}

class Equalizer extends EngineNode
{
  #frequencies;
  type = 'Equalizer';

  constructor(initObject) {
    super(initObject);

    this.source = Pizzicato.context.createGain();

    initObject.effects.forEach(effect => {
      this.addEffect(new Filter(effect));
    });

    this.#frequencies = generateFrequencies(1000);
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

  createNewFilter(type = 'highpass') {
    this.filters.push(new Filter(type));
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
      type: this.type,
      filters: this.filters.map(filter => filter.toPlainObject()),
      frequencies: this.#frequencies,
      frequencyResponse: this.getFrequencyResponse()
    }
  }
}

export default Equalizer;