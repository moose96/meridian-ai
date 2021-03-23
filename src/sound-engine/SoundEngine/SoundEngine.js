import {
  Sound,
  RandomContainer,
  SequenceContainer,
  ParallelContainer,
  SoundFX
} from '../';
import createEffect from '../effects';

const createObject = (object, onReady) => {
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
      result = new Sound(object, onReady);
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

class SoundEngine {
  static globalStore;

  static createSoundFX(data, onSoundReady, onProgressChange) {
    const root = data.find(object => object.root);
    let refs = [];
    let objectsLength = 0;
    let objectsReady = 0;

    const _map = value => {
      let arg;

      if (typeof(value) === 'number') { //if in the table will be number unlike object
        arg = {...data[value]};

        if (arg.type === 'sound') {
          objectsLength++;
        }

        if (arg.objects) {
          arg.objects = arg.objects.map(_map);
        }
      } else {
        if (arg.type === 'sound') {
          objectsLength++;
        }

        arg = value;
      }

      const result = createObject(arg, () => {
        objectsReady++;

        if (onProgressChange) {
          onProgressChange(objectsReady, objectsLength);
        }
        if (objectsReady >= objectsLength && onSoundReady) {
          onSoundReady();
        }

      });
      refs.push(result);
      return result;
    }

    if (root) {
      // objectsLength++;
      root.objects = root.objects.map(_map);
      const result = createObject(root);
      refs.push(result);

      console.log(objectsLength);
      return [null, result, refs];
    }
  }
}

export default SoundEngine;