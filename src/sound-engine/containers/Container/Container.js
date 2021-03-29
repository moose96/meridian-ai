import Pizzicato from 'pizzicato';

import EngineNode from '../../base/EngineNode';

const INTERVAL = 25; //ms

const defaultObject = {
  loop: false,
  delay: 0
}

class Container extends EngineNode
{
  loop = false;
  counter = 0;
  #delayNode;
  #intervalID = -1;

  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};

    super(initObject);
    this.source = initObject.objects;

    this.loop = initObject.loop;

    this.#delayNode = Pizzicato.context.createDelay(5.0);
    this.#delayNode.delayTime.value = (initObject.delay / 1000);
    this.#delayNode.connect(this.outputNode);

    this._connectSource(this.outputNode);
  }

  _connectSource(destination) {
    this.source.forEach(source => source.connect(destination));
  }

  _disconnectSource() {
    this.source.forEach(source => source.disconnect());
  }

  onPlay() {
    throw Error('This class should be overridden');
  }

  _playProc = () => { //change to #playProc()
    this.counter++;
    const currentDelay = this.delay / INTERVAL;

    if (this.counter >= currentDelay) {
      if (!this.muted) {
        super.play();
        this.onPlay();
      }
      this.counter = 0;
    }
  }

  get delay() {
    return parseInt(this.#delayNode.delayTime.value * 1000);
  }

  set delay(delay) {
    this._setAudioParam(this.#delayNode.delayTime, delay, value => parseInt(value) / 1000);
  }

  setPan(pan) {
    this.pan = pan;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  play() {
    super.play();

    if (this.loop) {
      this.#intervalID = setInterval(this._playProc, INTERVAL);
    } else {
      this.onPlay();
    }
  }

  stop() {
    super.stop();

    if (this.loop) {
      clearInterval(this.#intervalID);
    }
  }

  toPlainObject() {
    return {
      ...super.toPlainObject(),
      loop: this.loop,
      delay: this.delay
    }
  }

  setParamStore(store) {
    super.setParamStore(store);
    this.source.forEach(source => source.setParamStore(store));
  }

  getKeysOfAudioParams() {
    return [...super.getKeysOfAudioParams(), 'delay'];
  }
}

export default Container;