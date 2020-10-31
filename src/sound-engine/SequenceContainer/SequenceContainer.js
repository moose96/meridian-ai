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

  // clone() {
  //   const sounds = this.sounds.map(sound => sound.clone());
  //   return new SequenceContainer(sounds);
  // }

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
    super.play();
    if (this.loop) {
      this.intervalID = setInterval(this._run, INTERVAL);
    } else {
      this._run();
    }
  }

  stop = () => {
    if (this.loop) {
      clearInterval(this.intervalID);
    }
  }

  onPlay = () => {
    console.log('sequence container play, loop', this.loop, 'delay', this.delay * INTERVAL, 'pan', this.pan);
  }
}

export default SequenceContainer;