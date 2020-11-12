import Container from '../Container';

const INTERVAL = 25; //ms

class SequenceContainer extends Container
{
  loop = false;
  counter = 0;
  #delay = 0;
  #intervalID = -1;

  constructor(object) {
    super(object);
    this.loop = object.loop;
    this.delay = object.delay;
  }

  _run = () => { //change to #run()
    this.counter++;

    if (this.counter >= this.delay) {
      if (!this.muted) {
        this.source.forEach(sound => sound.play());
      }
      this.counter = 0;
    }
  }

  get delay() {
    return this.#delay;
  }

  set delay(delay) {
    this.#delay = Math.floor(delay / INTERVAL);
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
}

export default SequenceContainer;