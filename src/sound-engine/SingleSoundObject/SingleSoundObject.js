import SoundObject from '../SoundObject';

class SingleSoundObject extends SoundObject
{
  _calculate() {
    // console.log(this.position.x, this.attenuation);
    this.objects.forEach(object => object.setPan(this.position.x / this.attenuation));
  }
}

export default SingleSoundObject;