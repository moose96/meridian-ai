
class SoundField
{
  constructor() {
    this.sounds = [];
  }

  addSound = sound => {
    this.sounds.push(sound);
  }

  clearSounds = () => {
    this.sounds = [];
  }

  start = () => this.sounds.forEach(sound => sound.play());
  stop = () => this.sounds && this.sounds.forEach(sound => sound.stop());
  // stop = () => console.log(this.sounds);
}

export default SoundField;