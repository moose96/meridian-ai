import Randomizer from '../Randomizer';

class Container
{
  constructor(object) {
    this.id = Math.floor(Math.random() * 200);
    this.sounds = object.objects;
    this.effects = [];
    this.pan = 0;
    this.volume = 1;
    this.onPlay = null;
    this.muted = false;
    // this.type = type;

    // this.sounds.forEach(sound => sound.on('end', () => this.handleEnd()));

    if (object.volume) {
      this.volume = object.volume;
      this.setVolume(object.volume);
    }

    this.sounds.forEach(sound => sound.onLoad = () => {
      // if (object.detune) {
      //   console.log(object.detune);
      //   sound.setDetune(object.detune);
      //   console.log(sound.detune);
      // }
      // sound.setLength(100);
    });
      // this.setDetune(object.detune);

    //this.setPan(object.pan);?
  }

  setMuted(muted) {
    this.muted = muted;
    this.sounds.forEach(sound => sound.setMuted(muted));
  }

  addSound = (sound) => {
    this.sounds.push(sound);
  }

  addRandomization = (randomizer) => {
    this.randomizer = randomizer;
  }

  setPan = pan => {
    this.pan = pan;
    this.sounds.forEach(sound => sound.setPan(pan));
  }

  setDetune(detune) {
    this.sounds.forEach(sound => sound.setDetune(detune));
  }

  play() {
    // Randomizer.randomize(this.randomizer);

    if (this.onPlay) {
      this.onPlay();
    }
  }

  stop = () => {
    this.sounds.forEach(sound => sound.stop());
  }

  addEffect = effect => {
    this.effects.push(effect);
  }

  setVolume = volume => {
    this.sounds.forEach(sound => sound.setVolume(sound.volume * volume));
  }

  // handleEnd = () => {

  // }

  // onEnd = callback => {this.handleEnd = callback}
}

export default Container;