import {
  Sound,
  RandomContainer,
  SequenceContainer,
  ParallelContainer,
  SoundFX
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
    case "parallel container":
      result = new ParallelContainer(object);
    break;
    case "sound":
      result = new Sound(object);
    break;
    case "sound fx":
      result = new SoundFX(object);
    break
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
    let arg;

    if (typeof(value) === 'number') { //if in the table will be number unlike object
      arg = {...data[value]};

      if (arg.objects) {
        arg.objects = arg.objects.map(_map);
      }
    } else {
      arg = value;
    }

    const result = createObject(arg);
    refs.push(result);
    return result;
  }

  if (root) {
    root.objects = root.objects.map(_map);
    const result = createObject(root);
    refs.push(result);

    return [null, result, refs];
  }
}

// export default resolveLinks;