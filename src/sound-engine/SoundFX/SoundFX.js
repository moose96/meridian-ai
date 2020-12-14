import SoundEngineObject from '../base/SoundEngineObject';
import Container from '../containers/Container';

const defaultObject = {

}

class SoundFX extends SoundEngineObject
{
  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);

    if (initObject.objects[0] instanceof Container) {
      this.source = initObject.objects[0];
    } else {
      throw Error('Source has to be an instance of Container class');
    }

    this._connectSource(this.outputNode);
  }

  _connectSource(destination) {
    this.source.connect(destination);
  }

  _disconnectSource() {
    this.source.disconnect();
  }

  play() {
    super.play();
    this.source.play();
  }

  stop() {
    super.stop();
    this.source.stop();
  }
}

export default SoundFX;