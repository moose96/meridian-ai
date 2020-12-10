import SoundEngineObject from '../SoundEngineObject';

class Container extends SoundEngineObject
{
  constructor(object) {
    super(object);
    this.source = object.objects;

    this._connectSource(this.outputNode);
  }

  _connectSource(destination) {
    this.source.forEach(source => source.connect(destination));
  }

  _disconnectSource() {
    this.source.forEach(source => source.disconnect());
  }

  setPan(pan) {
    this.pan = pan;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  stop() {
    super.stop();
    this.source.forEach(sound => sound.stop());
  }
}

export default Container;