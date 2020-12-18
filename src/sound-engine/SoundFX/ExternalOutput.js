import Pizzicato from 'pizzicato';

class ExternalOutput
{
  node;
  constructor() {
    this.node = Pizzicato.context.createGain();
    this.node.gain.value = 0.0;
  }

  get gain() {
    return this.node.gain.value;
  }

  set gain(gain) {
    this.node.gain.value = gain;
  }

  connect(destination) {
    this.node.connect(destination);
  }

  disconnect() {
    this.node.disconnect();
  }
}

export default ExternalOutput;