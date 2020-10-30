import SoundObject from '../SoundObject';

class SingleSoundObject extends SoundObject
{
  _calculate() {
    this.objects.forEach(object => object.setPan(this.position.x / this.attenuation));
  }
}

export default SingleSoundObject;