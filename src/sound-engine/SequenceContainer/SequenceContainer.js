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
        this.sounds.forEach(sound => sound.play());
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
    // this.delay = Math.floor(delay / INTERVAL);
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

  onPlay() {
    console.log('sequence container play, loop', this.loop, 'delay', this.delay * INTERVAL, 'pan', this.pan);
  }
}

export default SequenceContainer;