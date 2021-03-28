import Pizzicato from 'pizzicato';
import EngineNode from '../base/EngineNode';

import store from '../../redux/store';
import { addCurrentVoices, subCurrentVoices } from '../redux';

const defaultObject = {
  //filename
  //attack
  //release
  //endPoint || duration
  delay: 0,
  startPoint: 0,
  detune: 0
}

class Sound extends EngineNode
{
  name = 'Sound';
  buffer;
  node;
  detune;
  startPoint = 0;
  originalLength = 0;
  delay = 0;

  constructor(_initObject, onReady) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);
    this.type = 'Sound'; //due to webpack issue

    if (!initObject.filename) {
      throw Error('"filename" field is not defined');
    }

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

      if (onReady) {
        onReady();
      }
    });
    this.delay = initObject.delay;
    this.startPoint = initObject.startPoint;
    this.detune = initObject.detune;

    this._connectSource(this.outputNode);

    this.source.on('play', () => {
      store.dispatch(addCurrentVoices());
    });

    this.source.on('end', () => {
      store.dispatch(subCurrentVoices());
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
    return this.buffer.length;
  }

  set endPoint(endPoint) {
    const data = this.buffer.getChannelData(0);
    const buffer = new AudioBuffer({
      sampleRate: this.buffer.sampleRate,
      numberOfChannels: this.buffer.numberOfChannels,
      length: parseInt(endPoint)
    });

    buffer.copyToChannel(data, 0);
    this.buffer = buffer;
  }

  get duration() {
    return this.endPoint - this.startPoint;
  }

  set duration(duration) {
    this.endPoint = parseInt(duration - this.startPoint);
  }

  get attack() {
    return this.source.attack;
  }

  set attack(attack) {
    this.source.attack = parseFloat(attack);
  }

  get release() {
    return this.source.release;
  }

  set release(release) {
    this.source.release = parseFloat(release);
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
    super.stop();
    this.source.stop();
  }

  toPlainObject() {
    return {
      ...super.toPlainObject(),
      detune: this.detune,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      duration: this.duration,
      originalLength: this.originalLength,
      delay: this.delay,
      attack: this.attack,
      release: this.release
    }
  }
}

export default Sound;