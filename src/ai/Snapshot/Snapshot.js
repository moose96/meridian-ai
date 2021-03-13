import { validate, version, v4 as uuid } from 'uuid';

import { mixParams, oscillateParams } from './utility';

const isUUID = id => {
  return validate(id) && version(id) === 4;
}

const INITIAL_OPTIONS = {
  mutationProbability: 0.2,
  mutationSize: 10
}

const createNewSnapshot = (snapshot, callback) => {
  const newSnapshot = new Snapshot();
  const soundsID = snapshot.getSoundsID();

  soundsID.forEach(item => {
    const params = callback(item);
    newSnapshot.setSoundParams(item, params);
  });

  return newSnapshot;
}

class Snapshot {
  id;
  origin;
  #sounds = {};

  _createFrom(initObject) {
    this.id = initObject.id;
    this.origin = initObject.origin;
    Object.entries(initObject)
      .filter(([key, value]) => isUUID(key))
      .forEach(([key, value]) => this.#sounds[key] = value);
  }

  _createNew() {
    this.id = uuid();
    this.origin = 'unknown';
  }

  constructor(initObject) {
    if (initObject) {
      this._createFrom(initObject);
    } else {
      this._createNew();
    }
  }

  getSoundParams(id) {
    return this.#sounds[id];
  }

  setSoundParams(id, params) {
    this.#sounds[id] = params;
  }

  getSoundsID() {
    return Object.keys(this.#sounds);
  }

  static mix(leftSnapshot, rightSnapshot, options = INITIAL_OPTIONS) {
    console.log(leftSnapshot, rightSnapshot);
    return createNewSnapshot(leftSnapshot, id =>
      mixParams(leftSnapshot.getSoundParams(id), rightSnapshot.getSoundParams(id), options)
    );
  }

  static oscillate(snapshot, offset) {
    return createNewSnapshot(snapshot, id => oscillateParams(snapshot.getSoundParams(id), offset));
  }
}

export default Snapshot;