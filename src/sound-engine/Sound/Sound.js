import Pizzicato from 'pizzicato';
import SoundEngineObject from '../base/SoundEngineObject';

import store from '../../redux/store';
import { addCurrentVoices, subCurrentVoices } from '../redux';

class Sound extends SoundEngineObject
{
  name = 'Sound';
  buffer;
  node;
  detune;
  startPoint = 0;
  originalLength = 0;
  delay = 0;

  constructor(initObject) {
    super(initObject);
    this.type = 'Sound'; //due to webpack issue

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
      this.buffer = this.node.buffer;
      this.originalLength = this.node.buffer.length;
      this.source.getRawSourceNode = this._getRawSourceNode;

      if (initObject.endPoint) {
        this.endPoint = initObject.endPoint;
      } else if(initObject.duration) {
        this.duration = initObject.duration;
      }
    });
    this.delay = initObject.delay ? initObject.delay : 0;
    this.startPoint = initObject.startPoint ? initObject.startPoint : 0;

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
      buffer: this.buffer,
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

  get endPoint() {
    return this.node.buffer.length;
  }

  set endPoint(endPoint) {
    const data = this.buffer.getChannelData(0);
    const buffer = new AudioBuffer({
      sampleRate: this.buffer.sampleRate,
      numberOfChannels: this.buffer.numberOfChannels,
      length: endPoint
    });

    buffer.copyToChannel(data, 0);
    this.buffer = buffer;
  }

  get duration() {
    return this.endPoint - this.startPoint;
  }

  set duration(duration) {
    this.endPoint = duration - this.startPoint;
  }

  get attack() {
    return this.source.attack;
  }

  set attack(attack) {
    this.source.attack = attack;
  }

  get release() {
    return this.source.release;
  }

  set release(release) {
    this.source.release = release;
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

  setStartPoint(startPoint) {
    this.startPoint = startPoint;
  }

  play(delay, startPoint) {
    super.play();

    const _delay = delay ? delay : this.delay;
    const _startPoint = startPoint ? startPoint : this.startPoint;

    this.source.play(_delay, _startPoint);
  }

  stop() {
    this.source.stop();
  }
}

export default Sound;