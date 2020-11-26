import SoundObject from '../base/SoundObject';

const lineAttenuation = (x, min, max, attenuation) => { //move this and from sound engine object to utility
  return ((min - max) / attenuation) * Math.abs(x) + max;
}

class SingleSoundObject extends SoundObject
{
  name = 'Single Sound Object';
  type = 'SingleSoundObject'; //due to webpack issue

  _calculate() {
    this.pan = this.position.x / this.attenuation;
    this.volume = lineAttenuation(this.position.y, 0.0, 1.0, this.attenuation);

    if (this.externalOutputs[0]) {
      this.externalOutputs[0].gain.value = lineAttenuation(this.position.y, 1.0, 0.0, this.attenuation);
    }
  }
}

export default SingleSoundObject;