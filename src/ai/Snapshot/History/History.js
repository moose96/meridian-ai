class History {
  #generation = -1;
  #history = [];

  constructor() {
    this.newGeneration();
  }

  _flat() {
    return this.#history.flat();
  }

  newGeneration() {
    this.#generation++;
    this.#history.push([]);
  }

  push(item) {
    this.#history[this.#generation].push(item);
  }

  atFront(index = 0) {
    return this._flat()[index];
  }

  atBack(index = 0) {
    const flat = this._flat();
    return flat[flat.length - 1 - index];
  }

  map(callback) {
    return this.#history[this.#generation].map(callback);
  }

  forEach(callback) {
    this.#history[this.#generation].forEach(callback);
  }
}

export default History;