import SoundObject from '../SoundObject';

class MultipleSoundObject extends SoundObject
{
  _calculate() {
    this.objects.forEach(object => {
      object.setPosition(
        this.position.x + object.position.x,
        this.position.y + object.position.y,
        this.position.z + object.position.z);
    });
  }

  setAttenuation(attenuation) {
    this.objects.forEach(object => object.setAttenuation(attenuation));
  }

  setMutedSound(index, muted) {
    this.objects[index].setMuted(muted);
  }
}

export default MultipleSoundObject;