import SoundObject from '../base/SoundObject';

class MultipleSoundObject extends SoundObject
{
  _calculate() {
    this.source.forEach(object => {
      object.setPosition(
        this.position.x + object.position.x,
        this.position.y + object.position.y,
        this.position.z + object.position.z);
    });
  }

  setAttenuation(attenuation) {
    this.source.forEach(object => object.setAttenuation(attenuation));
  }

  setMutedSound(index, muted) {
    this.source[index].setMuted(muted);
  }
}

export default MultipleSoundObject;