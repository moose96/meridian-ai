import SoundEngineObject from '../base/SoundEngineObject';
import Container from '../containers/Container';

const defaultObject = {

}

class SoundFX extends SoundEngineObject
{
  constructor(initObject) {
    const _initObject = {...defaultObject, ...initObject};
    super(_initObject);

    if (_initObject.source instanceof Container) {
      this.source = _initObject.source;
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