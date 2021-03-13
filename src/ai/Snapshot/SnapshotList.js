import _ from 'lodash';

import Snapshot from './Snapshot';
import ObservableArray from './ObservableArray';

class SnapshotList {
  #generation = 0;
  #defaultSnapshots = [];
  #snapshots = [];
  #history = [];
  #asmr = false;
  #asmrSnapshot = {};

  constructor(snapshots) {
    this.#defaultSnapshots = snapshots.map(item => new Snapshot(item));
    // this.#snapshots = ObservableArray.from(_.shuffle(this.#defaultSnapshots));
    this.#snapshots = _.shuffle(this.#defaultSnapshots);
    console.log(this.#snapshots);
    // this.#snapshots.observe(this.onSnapshotShift);
    this.#history.push([]);
  }

  // onSnapshotShift = () => {
  //   if (this.#snapshots.length === 0) {
  //     console.log(this.#snapshots);
  //     this._generate();
  //   }
  // }

  async _generate() {
    // this.#snapshots = ObservableArray.from(_.shuffle(this.#history[this.#generation]
    this.#snapshots = _.shuffle(this.#history[this.#generation]
      .map((item, _index, array) => {
        const index = (_index + 1) % array.length;
        return Snapshot.mix(item, array[index])
      // })));
      }));
    this.#generation++;
  }

  _takeSnapshot() {
    if (this.#snapshots.length > 0) {
      const nextSnapshot = this.#snapshots.shift();
      return nextSnapshot;
    }
  }

  _oscillate() {
    return Snapshot.oscillate(this.#asmrSnapshot, 10);
  }

  next() {
    let snapshot;

    if (this.asmr) {
      snapshot = this._oscillate();
    } else {
      snapshot = this._takeSnapshot();
    }

    this.#history[this.#generation].push(snapshot);

    if (this.#snapshots.length === 0) {
      this._generate();
    }
    return snapshot;
  }

  prev() {

  }

  get history() {
    return this.#history.flat();
  }

  setAsmrMode(mode) {
    this.#asmr = mode;

    if (this.#asmr) {
      this.#asmrSnapshot = this.history[this.history.length - 1];
    }
  }
}

export default SnapshotList;