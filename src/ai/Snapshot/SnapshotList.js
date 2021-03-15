import _ from 'lodash';

import Snapshot from './Snapshot';
import ObservableArray from './ObservableArray';

class SnapshotList {
  #generation = 0;
  #defaultSnapshots = [];
  #snapshots = [];
  #history = [];
  #oscillate = false;
  #oscillateSnapshot = {};

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
    let mutationProbability = 0.0;

    this.#snapshots = _.shuffle(this.#history[this.#generation]
      .map((item, _index, array) => {
        const index = (_index + 1) % array.length;
        return Snapshot.mix(item, array[index], { mutationProbability });
      // })));
      }));
    this.#generation++;
    this.#history.push([]);

    console.log('new generation: ', this.#snapshots, this.#generation);
  }

  _takeSnapshot() {
    if (this.#snapshots.length > 0) {
      const nextSnapshot = this.#snapshots.shift();
      return nextSnapshot;
    }
  }

  _oscillate() {
    return Snapshot.oscillate(this.#oscillateSnapshot, 10);
  }

  next() {
    let snapshot;

    if (this.#oscillate) {
      snapshot = this._oscillate();
    } else {
      snapshot = this._takeSnapshot();
    }

    console.log(this.#history);
    this.#history[this.#generation].push(snapshot);

    if (this.#snapshots.length === 0) {
      this._generate();
    }
    return snapshot;
  }

  prev() {
    const currentSnapshot = this.history[this.history.length - 1];
    const prevSnapshot = this.history[this.history.length - 2];
    const newSnapshot = Snapshot.mix(currentSnapshot, prevSnapshot, { mutationProbability: 0.5 });

    this.#snapshots = [];
    this.#snapshots.push(newSnapshot);

    for (let i = 0; i < this.#defaultSnapshots.length; i++) {
      this.#snapshots.push(Snapshot.oscillate(newSnapshot, 30));
    }

    console.log('prev mode:', this.#snapshots);
    return prevSnapshot;
  }

  get history() {
    return this.#history.flat();
  }

  oscillate(mode = true) {
    this.#oscillate = mode;

    if (this.#oscillate) {
      this.#oscillateSnapshot = this.history[this.history.length - 1];
      console.log('oscillate on: ', this.#oscillateSnapshot);
    }
  }
}

export default SnapshotList;