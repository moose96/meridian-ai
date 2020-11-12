import Pizzicato from 'pizzicato';
import SoundEngineObject from '../SoundEngineObject';

import store from '../../redux/store';
import { addCurrentVoices, subCurrentVoices } from '../redux';

class Sound extends SoundEngineObject
{
  node;
  detune;
  offset = 0;
  delay = 0;

  constructor(initObject) {
    super(initObject);

    this.source = new Pizzicato.Sound({
      source: 'file',
      options: {
        path: initObject.filename,
        detached: true,
        attack: initObject.attack && initObject.attack,
        release: initObject.release && initObject.release
      }
    }, () => {
      this.node = this.source.getRawSourceNode();
      this.source.getRawSourceNode = this._getRawSourceNode;
    });

    this._connectSource(this.outputNode);

    this.source.on('play', () => {
      store.dispatch(addCurrentVoices());
      console.log('play', initObject.filename, 'pan', this.pan, 'volume', this.volume, "tune", this.detune);
    });

    this.source.on('end', () => {
      store.dispatch(subCurrentVoices());
      console.log('end', initObject.filename);
    });
  }

  _getRawSourceNode = () => {
    const node = new AudioBufferSourceNode(Pizzicato.context, {
      buffer: this.node.buffer,
      loop: this.node.loop,
      detune: this.detune
    })
    return node;
  }

  _connectSource(destination) {
    this.source.connect(destination);
  }

  _disconnectSource() {
    this.source.disconnect();
  }

  setPan(newPan) {
    this.pan = newPan;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  setDelay(delay) {
    this.delay = delay;
  }

  setOffset(offset) {
    this.offset = offset;
  }

  play(delay, offset) {
    super.play();

    const _delay = delay ? delay : this.delay;
    const _offset = offset ? offset : this.offset;

    this.source.play(_delay, _offset);
  }

  stop() {
    this.source.stop();
  }
}

export default Sound;