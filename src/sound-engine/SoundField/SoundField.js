import Pizzicato from 'pizzicato';

class SoundField
{
  constructor() {
    this.sounds = [];
    this.effects = [Pizzicato.createConvolver()];

    this.effects[0].connect(Pizzicato.masterGainNode);
  }

  addSound(sound) {
    sound.connect(Pizzicato.masterGainNode);

    sound.createExternalOutputs(this.effects.size);
    this.effects.forEach((effect, index) => sound.externalConnect(index, effect));

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