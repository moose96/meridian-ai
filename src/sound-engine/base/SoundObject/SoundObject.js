import Pizzicato from 'pizzicato';

import Position3D from './Position3D';
import SoundEngineObject from '../SoundEngineObject';

class SoundObject extends SoundEngineObject
{
  attenuation = 0;
  #position;
  externalOutputs = [];

  constructor(object) {
    super(object);
    this.source = object.objects;

    this._connectSource(this.outputNode);

    if (object.position) {
      this.position = object.position;
    } else {
      this.position = Position3D(0.0, 0.0, 0.0);
    }
  }

  createExternalOutputs(size) {
    for (let i = 0; i < size; i++) {
      const gain = Pizzicato.context.createGain();
      gain.gain.value = 0.0;
      this.externalOutputs.push(gain);
    }
  }

  _connectSource(destination) {
    this.source.forEach(source => source.connect(destination));
  }

  _disconnectSource() {
    this.source.forEach(source => source.disconnect());
  }

  externalConnect(index, external) {
    this.externalOutputs[index].connect(external);
  }

  _calculate() {
    throw Error('This class has to be extended by another class');
  }

  get position() {
    return this.#position;
  }

  set position(position) {
    this.#position = position;
    this._calculate();
  }

  setPosition(x, y, z) {
    this.position = Position3D(x, y, z);
  }

  setPositionX(x) {
    this.position.x = x;
    this._calculate();
  }

  setPositionY (y) {
    this.position.y = y;
    this._calculate();
  }

  setPositionZ(z) {
    this.position.z = z;
    this._calculate();
  }

  setAttenuation(attenuation) {
    this.attenuation = attenuation;
    this._calculate();
  }

  play() {
    this.randomize();

    this.source.forEach(object => object.play());
  }

  stop() {
    this.source.forEach(object => object.stop());
  }

  toPlainObject() {
    return {
      ...super.toPlainObject(),
      attenuation: this.attenuation,
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z
      }
    }
  }
}

export default SoundObject;

/*
x - left/right
y - front/back
z - top/down
*/