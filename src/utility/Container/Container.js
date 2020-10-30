import Randomizer from '../Randomizer';

class Container
{
  constructor(sounds) {
    this.sounds = sounds;
    this.effects = [];
    // this.type = type;

    // this.sounds.forEach(sound => sound.on('end', () => this.handleEnd()));
  }

  addSound = (sound) => {
    this.sounds.push(sound);
  }

  addRandomization = (randomizer) => {
    this.randomizer = randomizer;
  }

  play = () => {
    Randomizer.randomize(this.randomizer);
  }

  stop = () => {
    this.sounds.forEach(sound => sound.stop());
  }

  addEffect = effect => {
    this.effects.push(effect);
  }

  setVolume = volume => {
    this.sounds.forEach(sound => sound.volume = volume);
  }

  // handleEnd = () => {

  // }

  // onEnd = callback => {this.handleEnd = callback}
}

export default Container;