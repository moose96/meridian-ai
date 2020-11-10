import Position3D from './Position3D';
import Randomization from '../Randomization';

class SoundObject extends Randomization
{
  objects = [];
  attenuation = 0;
  #muted = false;
  // lastChildVolume = 0;
  #position;

  constructor(object) {
    super(object.randomization);
    this.objects = object.objects;

    if (object.position) {
      this.position = object.position;
    } else {
      this.position = Position3D(0.0, 0.0, 0.0);
    }

    // this._calculate();
  }

  _calculate() {
    throw Error('This class has to be extended by another class');
  }

  get muted() {
    return this.#muted;
  }

  set muted(muted) {
    this.#muted = muted;
    this.objects.forEach(object => object.setMuted(muted));
  }

  setMuted(muted) {
    this.muted = muted;
    // this.objects.forEach(object => object.setMuted(muted));
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
    // this._calculate();
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

    if (!this.#muted) {
      this.objects.forEach(object => object.play());
    }
  }

  stop() {
    this.objects.forEach(object => object.stop());
  }
}

export default SoundObject;

/*
x - left/right
y - front/back
z - top/down
*/