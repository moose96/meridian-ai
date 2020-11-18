import Container from '../base/Container';

const INTERVAL = 25; //ms

class SequenceContainer extends Container
{
  name = 'Sequence Container';
  loop = false;
  counter = 0;
  _delay = 0;
  #intervalID = -1;

  constructor(object) {
    super(object);
    this.type = 'SequenceContainer'; //due to webpack issue
    this.loop = object.loop;
    this.delay = object.delay;
  }

  _run = () => { //change to #run()
    this.counter++;

    if (this.counter >= this._delay) {
      if (!this.muted) {
        this.source.forEach(sound => sound.play());
      }
      this.counter = 0;
    }
  }

  get delay() {
    return this._delay * INTERVAL;
  }

  set delay(delay) {
    this._delay = Math.floor(parseInt(delay) / INTERVAL);
  }

  setDelay = delay => {
    this.delay = delay;
  }

  play() {
    super.play();

    if (this.loop) {
      this.#intervalID = setInterval(this._run, INTERVAL);
    } else {
      this._run();
    }
  }

  stop() {
    if (this.loop) {
      clearInterval(this.#intervalID);
    }
  }

  toPlainObject() {
    return {
      ...super.toPlainObject(),
      delay: this.delay,
      loop: this.loop
    }
  }
}

export default SequenceContainer;