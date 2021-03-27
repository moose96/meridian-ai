import _ from 'lodash';

import Snapshot from '../Snapshot';
import History from '../History';

class SnapshotList {
  #defaultSnapshots = [];
  #snapshots = [];
  #history;
  #oscillate = false;
  #oscillateSnapshot = {};
  #similarity = 1.0;

  // mutation = {};
  // offset = 10;

  constructor(snapshots) {
    this.#defaultSnapshots = snapshots.map(item => new Snapshot(item));
    // this.#snapshots = ObservableArray.from(_.shuffle(this.#defaultSnapshots));
    this.#snapshots = _.shuffle(this.#defaultSnapshots);
    // console.log(this.#snapshots);
    // this.#snapshots.observe(this.onSnapshotShift);
    this.#history = new History();

    //__TEST__
    // this.mutation = {
    //   mutationProbability: 0.0,
    //   mutationSize: 0
    // };
  }

  // onSnapshotShift = () => {
  //   if (this.#snapshots.length === 0) {
  //     console.log(this.#snapshots);
  //     this._generate();
  //   }
  // }

  async _generate() {
    // this.#snapshots = ObservableArray.from(_.shuffle(this.#history[this.#generation]
    // let mutationProbability = 0.2;

    this.#snapshots = _.shuffle(this.#history.map((item, _index, array) => {
      const index = (_index + 1) % array.length;
      return Snapshot.mix(item, array[index]);
    // })));
    }));

    this.#history.newGeneration();

    // console.log('new generation: ', this.#snapshots);
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

    if (this.#oscillate) {
      snapshot = this._oscillate();
    } else {
      snapshot = this._takeSnapshot();
    }

    // console.log(this.#history);
    this.#history.push(snapshot);

    if (this.#snapshots.length === 0) {
      this._generate();
    }

    this._calculateSimilarity();
    return snapshot;
  }

  prev() {
    const currentSnapshot = this.history.atBack(-1);
    const prevSnapshot = this.history.atBack(-2);
    const newSnapshot = Snapshot.mix(currentSnapshot, prevSnapshot, { mutationProbability: 0.5 });

    this.#snapshots = [];
    this.#snapshots.push(newSnapshot);

    for (let i = 0; i < this.#defaultSnapshots.length; i++) {
      this.#snapshots.push(Snapshot.oscillate(newSnapshot, 30));
    }

    // console.log('prev mode:', this.#snapshots);
    this._calculateSimilarity();
    return prevSnapshot;
  }

  get history() {
    return this.#history;
  }

  oscillate(mode = true) {
    if (this.history.atBack()) {
      this.#oscillate = mode;

      if (this.#oscillate) {
        this.#oscillateSnapshot = this.history.atBack();
        // console.log('oscillate on: ', this.#oscillateSnapshot);
      }
    }
  }

  // get __TEST__similarity() {
  //   return this.#similarity;
  // }
}

export default SnapshotList;