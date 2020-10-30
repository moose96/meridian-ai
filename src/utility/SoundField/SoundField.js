
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
  stop = () => this.sound.forEach(sound => sound.stop());
}

export default SoundField;