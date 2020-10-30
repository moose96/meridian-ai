import Container from '../Container';

const INTERVAL = 25; //ms

class SequenceContainer extends Container
{
  constructor(object) {
    super(object.objects);
    this.loop = object.loop;
    this.counter = 0;
    this.delay = 0;

    this.setDelay(object.delay);
  }

  _run = () => {
    this.counter++;

    if (this.counter >= this.delay) {
      this.sounds.forEach(sound => sound.play());
      this.counter = 0;
    }
  }

  setDelay = delay => {
    this.delay = Math.floor(delay / INTERVAL);
  }

  play = () => {
    if (this.loop) {
      this.intervalID = setInterval(this._run, INTERVAL);
    } else {
      this._run();
    }
  }

  stop = () => {
    clearInterval(this.intervalID);
  }
}

export default SequenceContainer;