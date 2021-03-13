import SoundEngine, { SoundField } from '../sound-engine'
// import { select, mix, oscillate, createNewParams } from './ParamsMixer';
import { SnapshotList } from './Snapshot';
class AIComposer {
  #intervalID;
  #soundField;
  #snapshots;
  #time = 10000;

  constructor() {
    this.#soundField = new SoundField();
  }

  _run = () => {
    this.next();
  }

  _setParams(snapshot) {
    console.log(this.#snapshots);
    this.#soundField.sounds.forEach(sound => {
      sound.setParams(snapshot.getSoundParams(sound.id));
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
        this.#snapshots = new SnapshotList(snapshots);
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
    this._setParams(this.#snapshots.next());
  }

  prev() {
    this._setParams(this.#snapshots.prev());
  }
}

export default AIComposer;