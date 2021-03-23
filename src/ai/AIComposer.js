import SoundEngine, { SoundField } from '../sound-engine'
// import { select, mix, oscillate, createNewParams } from './ParamsMixer';
import { SnapshotList } from './Snapshot';
class AIComposer {
  #intervalID;
  #soundField;
  #snapshots;
  #time = 10000;
  #progressChange = () => {};
  #isRunning = false;

  constructor() {
    this.#soundField = new SoundField();
  }

  _run = () => {
    this.next();
  }

  _setParams(snapshot) {
    console.log('new Snapshot', snapshot);
    this.#soundField.sounds.forEach(sound => {
      sound.setParams(snapshot.getSoundParams(sound.id));
    });
  }


  onProgressChange(callback) {
    this.#progressChange = callback;
  }

  handleSoundReady = (current, max, callback) => {
    if (current + 1 === max) {
      callback();
    }
  }

  addSounds(data, onSoundReady) {
    if (data) {
      const { sounds, snapshots } = data;
      if (Array.isArray(sounds)) {
        sounds.forEach((sound, index) => {
          const [_, result, __] =
            SoundEngine.createSoundFX(sound, () => {
              this.handleSoundReady(index, sounds.length, onSoundReady)
            },this.#progressChange);

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
    this.#isRunning = true;
  }

  stop() {
    clearInterval(this.#intervalID);
    this.#soundField.stop();
    this.#isRunning = false;
  }

  next() {
    this._setParams(this.#snapshots.next());
  }

  prev() {
    this._setParams(this.#snapshots.prev());
  }

  oscillate(mode) {
    if (this.#snapshots) {
      this.#snapshots.oscillate(mode);
    }
  }

  clear() {
    this.#soundField.clearSounds();
    this.#snapshots = null;
  }

  hasSounds() {
    return this.#soundField.sounds.length > 0;
  }

  isRunning() {

  }
}

export default AIComposer;