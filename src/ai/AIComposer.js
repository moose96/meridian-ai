import SoundEngine, { SoundField } from '../sound-engine'
class AIComposer {
  #intervalID;
  #soundField;
  #soundsParams;
  #history;
  #time = 10000;

  constructor() {
    this.#soundField = new SoundField();
  }

  _randomizeParams() {
    const paramIDs = this.#soundsParams.map(params => params.id);
    const used = this.#history.map(params => params.id);
    const available = [];
    paramIDs.forEach(id => used.includes(id) && available.push(id));

    if (available.length === 0) {
      this.stop();
    } else {
      const params = available[Math.random() % available.length];
      this.#history.push(params);
      return params;
    }
  }

  _run() {
    const params = this._randomizeParams();
    this._setParams(params);
  }

  _setParams(params) {
    this.#soundField.sounds.forEach(sound => {
      sound.setParams(params[sound.id]);
    });
  }

  addSounds(data) {
    if (data) {
      const { sounds, snapshots } = data;
      if (Array.isArray(sounds)) {
        sounds.forEach(sound => {
          const [_, result, __] = SoundEngine.createSoundFX(sound);
          this.#soundField.addSound(result);
        });
      } else {
        throw Error('sounds are not array');
      }

      if (Array.isArray(snapshots)) {
        this.#soundsParams = snapshots;
      } else {
        throw Error('snapshots are not array');
      }
    } else {
      throw Error('data is undefined');
    }
  }

  start() {
    this.#soundField.start();
    this.#intervalID = setInterval(this._run, this.#time);
  }

  stop() {
    clearInterval(this.#intervalID);
    this.#soundField.stop();
  }

  next() {
    this._run();
  }

  prev() {
    this._setParams(this.#history[this.#history.length - 1]);
  }
}

export default AIComposer;