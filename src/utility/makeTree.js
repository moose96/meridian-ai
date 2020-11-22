import {
  Sound,
  RandomContainer,
  SequenceContainer,
  SingleSoundObject,
  MultipleSoundObject
} from '../sound-engine';

const createObject = object => {
  switch(object.type) {
    case "random container":
      return new RandomContainer(object);
    case "sequence container":
      return new SequenceContainer(object);
    case "single sound object":
      return new SingleSoundObject(object);
    case "multiple sound object":
      return new MultipleSoundObject(object);
    case "sound":
      return new Sound(object);
    default:
      return object
  }
}

export const makeTree = data => {
  const root = data.find(object => object.root);
  let refs = [];

  const _map = value => {
    if (typeof(value) === 'number') { //if in the table will be number unlike object
      const object = {...data[value]};
      object.objects = object.objects.map(_map);

      const result = createObject(object);
      refs.push(result);

      return result;
    } else {
      const result = createObject(value);
      refs.push(result);
      return result;
    }
  }

  if (root) {
    root.objects = root.objects.map(_map);
    const result = createObject(root);
    refs.push(result);

    return [null, result, refs];
  }
}

// export default resolveLinks;