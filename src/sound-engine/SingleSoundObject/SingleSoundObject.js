import SoundObject from '../SoundObject';

const lineAttenuation = (x, attenuation) => {
  return (-1.0 /*max volume*/ / attenuation) * x + 1.0;
}

class SingleSoundObject extends SoundObject
{
  constructor(object) {
    super(object);

    this.pan = 0.6;
  }

  _calculate() {
    // this.source.forEach(object => {
    //   object.setPan(this.position.x / this.attenuation);
    //   object.setVolume(lineAttenuation(this.position.y, this.attenuation));
    // });
    this.pan = this.position.x / this.attenuation;
    this.volume = lineAttenuation(this.position.y, this.attenuation);
  }
}

export default SingleSoundObject;