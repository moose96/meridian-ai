import Pizzicato from 'pizzicato';

import SoundEngineObject from '../../base/SoundEngineObject';

const INTERVAL = 25; //ms

const defaultObject = {
  loop: false,
  delay: 0
}

class Container extends SoundEngineObject
{
  loop = false;
  counter = 0;
  #delayNode;
  #intervalID = -1;

  constructor(initObject) {
    const _initObject = {...defaultObject, ...initObject};

    super(_initObject);
    this.source = _initObject.objects;

    this.loop = _initObject.loop;

    this.#delayNode = Pizzicato.context.createDelay(5.0);
    this.#delayNode.delayTime.value = (_initObject.delay / 1000);
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
        this.onPlay();
      }
      this.counter = 0;
    }
  }

  get delay() {
    return parseInt(this.#delayNode.delayTime.value * 1000);
  }

  set delay(delay) {
    this._setAudioParam(this.#delayNode.delayTime, parseInt(delay) / 1000);
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
}

export default Container;