import SoundObject from '../base/SoundObject';

const lineAttenuation = (x, attenuation) => {
  return (-1.0 /*max volume*/ / attenuation) * x + 1.0;
}

class SingleSoundObject extends SoundObject
{
  name = 'Single Sound Object';
  _calculate() {
    this.pan = this.position.x / this.attenuation;
    this.volume = lineAttenuation(this.position.y, this.attenuation);
  }
}

export default SingleSoundObject;