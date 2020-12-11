import Pizzicato from 'pizzicato';

import Container from '../Container';

// const INTERVAL = 25; //ms

class SequenceContainer extends Container
{
  name = 'Sequence Container';
  // loop = false;
  // counter = 0;
  // #delayNode;
  // #intervalID = -1;

  constructor(object) {
    super(object);
    this.type = 'SequenceContainer'; //due to webpack issue
    // this.loop = object.loop;
    // // this.#delay = object.delay;

    // this.#delayNode = Pizzicato.context.createDelay(5.0);
    // this.#delayNode.delayTime.value = (object.delay / 1000);
    // this.#delayNode.connect(this.outputNode);
  }

  onPlay() {
    this.source.forEach(sound => sound.play()); //parallel container!!!
  }

  // _run = () => { //change to #run()
  //   this.counter++;
  //   const currentDelay = this.delay / INTERVAL;

  //   if (this.counter >= currentDelay) {
  //     if (!this.muted) {
  //       this.source.forEach(sound => sound.play());
  //     }
  //     this.counter = 0;
  //   }
  // }

  // get delay() {
  //   return parseInt(this.#delayNode.delayTime.value * 1000);
  // }

  // set delay(delay) {
  //   this._setAudioParam(this.#delayNode.delayTime, parseInt(delay) / 1000);
  // }

  // setDelay = delay => {
  //   this.delay = delay;
  // }

  // play() {
  //   super.play();

  //   if (this.loop) {
  //     this.#intervalID = setInterval(this._run, INTERVAL);
  //   } else {
  //     this._run();
  //   }
  // }

  // stop() {
  //   super.stop();
  //   if (this.loop) {
  //     clearInterval(this.#intervalID);
  //   }
  // }

  toPlainObject() {
    return {
      ...super.toPlainObject()
      // delay: this.delay,
      // loop: this.loop
    }
  }
}

export default SequenceContainer;