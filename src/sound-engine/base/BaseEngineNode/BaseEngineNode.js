import SoundEngineObject from '../SoundEngineObject';

class BaseEngineNode extends SoundEngineObject
{
  type;
  source;

  constructor(initObject) {
    super(initObject);
    this.type = this.constructor.name;
  }
}

export default BaseEngineNode;