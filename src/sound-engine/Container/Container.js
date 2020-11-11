import Randomization from '../Randomization';

class Container extends Randomization
{
  sounds = [];
  effects = [];
  #pan = 0;
  #volume = 1;
  #muted = false;

  constructor(object) {
    super(object.randomization);
    this.sounds = object.objects;
    this.onPlay = null;

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

  addSound(sound) {
    this.sounds.push(sound);
  }

  get muted() {
    return this.#muted;
  }

  set muted(muted) {
    this.#muted = muted;
    this.sounds.forEach(sound => sound.setMuted(muted));
  }

  setMuted(muted) {
    // this.muted = muted;
    // this.sounds.forEach(sound => sound.setMuted(muted));
    this.muted = muted;
  }

  get pan() {
    return this.#pan;
  }

  set pan(pan) {
    this.#pan = pan;
    this.sounds.forEach(sound => sound.setPan(pan));
  }

  setPan(pan) {
    this.pan = pan;
  }

  get volume() {
    return this.#volume;
  }

  set volume(volume) {
    this.#volume = volume;
    this.sounds.forEach(sound => sound.setVolume(sound.volume * volume));
  }

  setVolume = volume => {
    // this.sounds.forEach(sound => sound.setVolume(sound.volume * volume));
    this.volume = volume;
  }

  // set attack(attack) {
  //   this.sounds.forEach(sound => sound.attack = attack);
  // }

  // set release(release) {
  //   this.sounds.forEach(sound => sound.release = release);
  // }

  // setDetune(detune) {
  //   this.sounds.forEach(sound => sound.setDetune(detune));
  // }

  play() {
    this.randomize();

    if (this.onPlay) {
      this.onPlay();
    }
  }

  stop() {
    this.sounds.forEach(sound => sound.stop());
  }

  addEffect(effect) {
    this.effects.push(effect);
  }
}

export default Container;