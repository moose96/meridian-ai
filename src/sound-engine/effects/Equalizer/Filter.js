import Pizzicato from 'pizzicato';

class Filter extends BiquadFilterNode {
  constructor(init) {
    if (typeof(init) === 'string') {
      super(Pizzicato.context, { type: init });
    } else if (typeof(init) === 'object') {
      super(Pizzicato.context, init);
    } else {
      throw Error("can't create Filter class");
    }
  }

  get gain() {
    return this.gain.value;
  }

  set gain(gain) {
    this.gain.value = gain;
  }

  get frequency() {
    return this.frequency.value;
  }

  set frequency(frequency) {
    this.frequency.value = frequency;
  }

  get Q() {
    return this.Q.value;
  }

  set Q(Q) {
    this.Q.value = Q;
  }
}

export default Filter;