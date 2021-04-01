import Pizzicato from 'pizzicato';
import EngineNode from '../base/EngineNode';
import { v4 as uuid } from 'uuid';

// import store from '../../redux/store';
// import { addCurrentVoices, subCurrentVoices } from '../redux';

const defaultObject = {
  //filename
  attack: 0.04,
  release: 0.04,
  //endPoint || duration
  delay: 0,
  startPoint: 0,
  detune: 0
}

class Sound extends EngineNode
{
  name = 'Sound';
  attack;
  release;
  #defaultBuffer;
  #buffer;
  node;
  detune;
  #startPoint = 0;
  originalLength = 0;
  delay = 0;

  constructor(_initObject, onReady) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);
    this.type = 'Sound'; //due to webpack issue

    if (!initObject.filename) {
      throw Error('"filename" field is not defined');
    }

    fetch(initObject.filename)
      .then(data => data.arrayBuffer())
      .then(rawSoundData => Pizzicato.context.decodeAudioData(rawSoundData))
      .then(decodedData => {
        this.#defaultBuffer = decodedData;
        this.originalLength = this.#defaultBuffer.length;
        this.#buffer = this.#defaultBuffer;

        this.startPoint = initObject.startPoint;

        if (initObject.endPoint) {
          this.endPoint = initObject.endPoint;
        } else if(initObject.duration) {
          this.duration = initObject.duration;
        }

        if (onReady) {
          onReady();
        }
      })
      .catch(err => {
        throw Error(err)
      });

    this.source = {};
    this.attack = initObject.attack;
    this.release = initObject.release;
    this.delay = initObject.delay;
    this.detune = initObject.detune;

    // this._connectSource(this.outputNode);
  }

  //for hacking Pizzicato
  // _getRawSourceNode = () => {
  //   console.log('get raw source node', this.detune);
  //   const node = new AudioBufferSourceNode(Pizzicato.context, {
  //     buffer: this.#buffer,
  //     loop: this.node.loop,
  //     detune: this.detune
  //   })
  //   return node;
  // }

  _connectSource(destination) {
    this.source.connect(destination);
  }

  _disconnectSource() {
    this.source.disconnect();
  }

  get startPoint() {
    return this.#startPoint;
  }

  set startPoint(startPoint) {
    this.#startPoint = startPoint;

    let data = this.#defaultBuffer.getChannelData(0);
    data = data.subarray(startPoint);
    const buffer = new AudioBuffer({
      sampleRate: this.#defaultBuffer.sampleRate,
      numberOfChannels: this.#defaultBuffer.numberOfChannels,
      length: data.length
    });

    buffer.copyToChannel(data, 0);
    this.#buffer = buffer;
  }

  get endPoint() {
    return this.#defaultBuffer.length - this.#defaultBuffer.length + this.#startPoint;
  }

  set endPoint(endPoint) {
    let data = this.#defaultBuffer.getChannelData(0);
    console.log(data.length);
    data = data.subarray(0, endPoint);
    console.log(data.length, endPoint);
    const buffer = new AudioBuffer({
      sampleRate: this.#defaultBuffer.sampleRate,
      numberOfChannels: this.#defaultBuffer.numberOfChannels,
      length: data.length
    });

    buffer.copyToChannel(data, 0);
    this.#buffer = buffer;
  }

  get duration() {
    return this.endPoint - this.startPoint;
  }

  set duration(duration) {
    this.endPoint = parseInt(duration - this.startPoint);
  }

  //TODO: apply attack and release

  // get attack() {
  //   return this.source.attack;
  // }

  // set attack(attack) {
  //   this.source.attack = parseFloat(attack);
  // }

  // get release() {
  //   return this.source.release;
  // }

  // set release(release) {
  //   this.source.release = parseFloat(release);
  // }

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

  _onEnded = (id, callback) => {
    delete this.source[id];

    console.log('sound end', id);

    if (callback) {
      callback();
    }
  }

  play(delay) {
    super.play();

    const _delay = delay ? delay : this.delay;

    const node = new AudioBufferSourceNode(Pizzicato.context, {
      buffer: this.#buffer,
      loop: this.loop,
      detune: this.detune
    });

    node.connect(this.outputNode);
    const id = uuid();
    this.source[id] = node;

    return new Promise((resolve, reject) => {
      node.addEventListener('ended', () => this._onEnded(id, () => resolve()));
      node.start(_delay);
      console.log(Object.keys(this.source).length);
    });
  }

  stop() {
    super.stop();
    this.source.forEach(item => item.stop());
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