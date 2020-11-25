import Pizzicato from 'pizzicato';

class SoundField
{
  constructor() {
    this.sounds = [];
    this.effects = [Pizzicato.createConvolver()];
  }

  addSound(sound) {
    sound.connect(Pizzicato.masterGainNode);
    this.sounds.push(sound);
  }

  clearSounds() {
    this.sounds = [];
  }

  start(){
    this.sounds.forEach(sound => sound.play());
  }

  stop() {
    this.sounds && this.sounds.forEach(sound => sound.stop());
  }
}

export default SoundField;