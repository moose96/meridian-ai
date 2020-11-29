import {
  Sound,
  RandomContainer,
  SequenceContainer,
  SingleSoundObject,
  MultipleSoundObject
} from '../sound-engine';
import createEffect from '../sound-engine/effects';

const createObject = object => {
  let result;
  switch(object.type) {
    case "random container":
      result = new RandomContainer(object);
    break;
    case "sequence container":
      result = new SequenceContainer(object);
    break;
    case "single sound object":
      result = new SingleSoundObject(object);
    break;
    case "multiple sound object":
      result = new MultipleSoundObject(object);
    break;
    case "sound":
      result = new Sound(object);
    break;
    default:
      result = object
  }

  if (object.effects) {
    object.effects.forEach(effect => result.addEffect(createEffect(effect)));
  }

  return result;
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