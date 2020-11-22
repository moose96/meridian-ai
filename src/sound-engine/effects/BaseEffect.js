import SoundEngineObject from '../base/SoundEngineObject';

class BaseEffect extends SoundEngineObject
{
  constructor(initObject) {
    super(initObject);
    console.log('hello');
  }
}

export default BaseEffect;