import Pizzicato from 'pizzicato';

class SoundField
{
  constructor() {
    this.sounds = [];
    this.effects = [new Pizzicato.Effects.Convolver({
      impulse: '/data/impulses/Large Long Echo Hall.wav',
      mix: 1.0
    }, () => console.log('impulse loaded'))];

    this.effects[0].connect(Pizzicato.masterGainNode);
  }

  addSound(sound) {
    sound.connect(Pizzicato.masterGainNode);

    sound.createExternalOutputs(this.effects.length);
    this.effects.forEach((effect, index) => sound.externalConnect(index, effect.inputNode));

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