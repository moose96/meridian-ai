import SoundObject from '../SoundObject';

const lineAttenuation = (x, attenuation) => {
  return (-1.0 /*max volume*/ / attenuation) * x + 1.0;
}

class SingleSoundObject extends SoundObject
{
  _calculate() {
    this.objects.forEach(object => {
      object.setPan(this.position.x / this.attenuation);
      object.setVolume(lineAttenuation(this.position.y, this.attenuation));
    });
  }
}

export default SingleSoundObject;