import SoundObject from '../base/SoundObject';

class MultipleSoundObject extends SoundObject
{
  name = 'Multiple Sound Object';
  type = 'MultipleSoundObject'; //due to webpack issue
  _calculate() {
    this.source.forEach(object => {
      object.setPosition(
        parseFloat(this.position.x) + object.position.x,
        parseFloat(this.position.y) + object.position.y,
        parseFloat(this.position.z) + object.position.z);
    });
  }

  createExternalOutputs(size) {
    super.createExternalOutputs(size);

    this.source.forEach(source => source.createExternalOutputs(size));
  }

  externalConnect(index, external) {
    super.externalConnect(index, external);

    this.source.forEach(source => source.externalConnect(index, external));
  }

  setAttenuation(attenuation) {
    super.setAttenuation(attenuation);
    this.source.forEach(object => object.setAttenuation(attenuation));
  }

  setMutedSound(index, muted) {
    this.source[index].setMuted(muted);
  }
}

export default MultipleSoundObject;