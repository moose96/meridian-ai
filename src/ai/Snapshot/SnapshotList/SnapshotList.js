import _ from 'lodash';

import Snapshot from '../Snapshot';
import History from '../History';
import { algorithms } from './constants';

class SnapshotList {
  #defaultSnapshots = [];
  #snapshots = [];
  #history;
  #asmrMode = false;
  #asmrSnapshot = {};
  #similarity = 1.0;
  #mode = 'normal';
  #algorithm = 'genetic mixing';

  constructor(snapshots) {
    this.#defaultSnapshots = snapshots.map(item => new Snapshot(item));
    this.#snapshots = _.shuffle(this.#defaultSnapshots);
    this.#history = new History();
  }

  async _generate() {
    this.#snapshots = _.shuffle(this.#history.map((item, _index, array) => {
      const index = (_index + 1) % array.length;
      return Snapshot.mix(item, array[index], algorithms['genetic mixing'].normal);
    }));

    this.#history.newGeneration();
  }

  _takeSnapshot() {
    if (this.#snapshots.length > 0) {
      const nextSnapshot = this.#snapshots.shift();
      return nextSnapshot;
    }
  }

  _oscillate() {
    return Snapshot.oscillate(this.#asmrSnapshot, algorithms['oscillate'].asmr.mutationSize);
  }

  _calculateSimilarity() {
    const currentSnapshot = this.history.atBack();
    const lastSnapshot = this.history.atBack(1);

    if (lastSnapshot) {
      this.#similarity = currentSnapshot.calculateSimilarity(lastSnapshot);
    }
    console.log('similarity: ', this.#similarity);
  }

  next() {
    let snapshot;

    if (this.#asmrMode) {
      snapshot = this._oscillate();
    } else {
      snapshot = this._takeSnapshot();
    }

    this.#history.push(snapshot);

    if (this.#snapshots.length === 0) {
      this._generate();
    }

    this._calculateSimilarity();
    return snapshot;
  }

  prev() {
    const currentSnapshot = this.history.atBack(1);
    const prevSnapshot = this.history.atBack(2);
    console.log(this.history, currentSnapshot, prevSnapshot);
    // const newSnapshot = Snapshot.mix(currentSnapshot, prevSnapshot, algorithms['genetic mixing'].prev);

    this.#snapshots = [];
    // this.#snapshots.push(newSnapshot);

    for (let i = 0; i < this.#defaultSnapshots.length; i++) {
      // this.#snapshots.push(Snapshot.oscillate(newSnapshot, 30));
      this.#snapshots.push(Snapshot.mix(currentSnapshot, prevSnapshot, algorithms['genetic mixing'].prev));
    }

    this._calculateSimilarity();
    this.#asmrMode = false;
    return prevSnapshot;
  }

  get history() {
    return this.#history;
  }

  //in next versions it will be deprecated
  oscillate(mode = true) {
    if (this.history.atBack()) {
      this.#asmrMode = mode;

      if (this.#asmrMode) {
        this.#asmrSnapshot = this.history.atBack();
      }
    }
  }

  get __TEST__similarity() {
    return this.#similarity;
  }
}

export default SnapshotList;