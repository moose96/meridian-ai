class ObservableArray extends Array
{
  #observe;

  observe(callback) {
    this.#observe = callback;
  }

  shift() {
    const value = super.shift();
    this.#observe();
    return value;
  }
}

export default ObservableArray;