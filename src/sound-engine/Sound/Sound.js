import Pizzicato from "pizzicato";
import EngineNode from "../base/EngineNode";
import { v4 as uuid } from "uuid";

import { linear } from "../utility";

// import store from '../../redux/store';
// import { addCurrentVoices, subCurrentVoices } from '../redux';

const defaultObject = {
  //filename
  fadeMode: "cue", //cue | always
  attack: 0.02,
  release: 0.02,
  //endPoint || duration
  startPoint: 0,
  delay: 0,
  duration: 4800,
  detune: 0,
};

class Sound extends EngineNode {
  name = "Sound";
  #attack;
  #release;
  #defaultBuffer;
  #buffer;
  node;
  detune;
  #startPoint = 0;
  originalLength = 0;
  delay = 0;

  constructor(_initObject, onReady) {
    const initObject = { ...defaultObject, ..._initObject };
    super(initObject);
    this.type = "Sound"; //due to webpack issue

    if (!initObject.filename) {
      throw Error('"filename" field is not defined');
    }

    fetch(initObject.filename)
      .then((data) => data.arrayBuffer())
      .then((rawSoundData) => Pizzicato.context.decodeAudioData(rawSoundData))
      .then((decodedData) => {
        this.#defaultBuffer = decodedData;
        this.originalLength = this.#defaultBuffer.length;
        this.#buffer = this.#defaultBuffer;

        this.#release = initObject.release;

        if (initObject.startPoint !== 0) {
          this.#attack = initObject.attack;
          this.startPoint = initObject.startPoint;
        } else if (initObject.fadeMode === "always") {
          this.attack = initObject.attack;
        }

        if (initObject.endPoint) {
          this.endPoint = initObject.endPoint;
        } else if (initObject.duration) {
          this.duration = initObject.duration;
        } else if (initObject.fadeMode === "always") {
          this.release = initObject.release;
        }

        if (onReady) {
          onReady();
        }
      })
      .catch((err) => {
        throw Error(err);
      });

    this.source = {};
    this.delay = initObject.delay;
    this.detune = initObject.detune;
  }

  _connectSource(destination) {
    this.source.connect(destination);
  }

  _disconnectSource() {
    this.source.disconnect();
  }

  _modifyBuffer(inBuffer, modifyCallback) {
    const data = modifyCallback(inBuffer.getChannelData(0));
    const outBuffer = new AudioBuffer({
      sampleRate: inBuffer.sampleRate,
      numberOfChannels: inBuffer.numberOfChannels,
      length: data.length,
    });
    outBuffer.copyToChannel(data, 0);
    return outBuffer;
  }

  get startPoint() {
    return this.#startPoint;
  }

  set startPoint(startPoint) {
    this.#startPoint = startPoint;

    this.#buffer = this._modifyBuffer(this.#defaultBuffer, (data) => {
      const newData = data.subarray(startPoint);
      return this._applyFade(newData, this.#attack);
    });
  }

  get endPoint() {
    return (
      this.#defaultBuffer.length - this.#defaultBuffer.length + this.#startPoint
    );
  }

  set endPoint(endPoint) {
    this.#buffer = this._modifyBuffer(this.#defaultBuffer, (data) => {
      const newData = data.subarray(0, endPoint);
      return this._applyFade(newData, -this.#release);
    });
  }

  get duration() {
    return this.endPoint - this.startPoint;
  }

  set duration(duration) {
    this.endPoint = parseInt(duration - this.startPoint);
  }

  get attack() {
    return this.#attack;
  }

  set attack(attack) {
    this.#attack = attack;
    this.#buffer = this._modifyBuffer(this.#buffer, (data) =>
      this._applyFade(data, attack)
    );
  }

  get release() {
    return this.#release;
  }

  set release(release) {
    this.#release = release;
    this.#buffer = this._modifyBuffer(this.#buffer, (data) =>
      this._applyFade(data, -release)
    );
  }

  _applyFade(data, fadeSizeSec) {
    const fadeSize = fadeSizeSec * this.#buffer.sampleRate;
    const start = fadeSize >= 0 ? 0 : data.length + fadeSize; //plus because fadeSize is < 0
    const end = fadeSize >= 0 ? fadeSize : data.length;
    let newData = new Float32Array(data);

    const linearOptions = {
      minY: fadeSize >= 0 ? 0.0 : 1.0,
      maxY: fadeSize >= 0 ? 1.0 : 0.0,
      minX: start,
      maxX: end,
    };

    for (let i = start; i < end; i++) {
      newData[i] *= linear(i, linearOptions);
    }

    return newData;
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

  _onEnded = (id, callback) => {
    delete this.source[id];

    console.log("sound end", id);

    if (callback) {
      callback();
    }
  };

  play(delay) {
    super.play();

    const _delay = delay ? delay : this.delay;

    const node = new AudioBufferSourceNode(Pizzicato.context, {
      buffer: this.#buffer,
      loop: this.loop,
      detune: this.detune,
    });

    node.connect(this.outputNode);
    const id = uuid();
    this.source[id] = node;

    return new Promise((resolve, reject) => {
      node.addEventListener("ended", () => this._onEnded(id, () => resolve()));
      node.start(_delay);
      console.log(Object.keys(this.source).length);
    });
  }

  stop() {
    super.stop();
    this.source.forEach((item) => item.stop());
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
      attack: this.#attack,
      release: this.#release,
    };
  }
}

export default Sound;
