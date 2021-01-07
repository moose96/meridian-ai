import ParamListener from '../ParamListener';
import RandomizationList from '../Randomization/RandomizationList';

const defaultObject = {
  randomization: [],
  params: []
}

class SoundEngineObject extends ParamListener
{
  type;

  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);

    this.type = this.constructor.name;
    this.randomization = new RandomizationList(initObject.randomization, this);
  }

  toPlainObject() {
    return {
      randomization: this.randomization.toPlainObject(),
    };
  }
}

export default SoundEngineObject;