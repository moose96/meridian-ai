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
    // this.type = type;

    // this.sounds.forEach(sound => sound.on('end', () => this.handleEnd()));

    if (object.volume) {
      this.volume = object.volume;
      this.setVolume(object.volume);
    }

    //this.setPan(object.pan);?
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