class Filter {
  static get(filter, key) {
    switch(key) {
      case 'type':
        return filter.type;
      case 'gain':
        return filter.gain.value;
      case 'frequency':
        return filter.frequency.value;
      case 'Q':
        return filter.Q.value;
      default:
        return null;
    }
  }

  static set(filter, key, value) {
    switch(key) {
      case 'type':
        filter.type = value;
      break;
      case 'gain':
        filter.gain.value = value;
      break;
      case 'frequency':
        filter.frequency.value = value;
      break;
      case 'Q':
        filter.Q.value = value;
      break;
      default:
        return null;
    }
  }

  static toPlainObject(object) {
    return {
      type: object.type,
      gain: object.gain.value,
      frequency: object.frequency.value,
      Q: object.Q.value
    }
  }
}

export default Filter;