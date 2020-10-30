import Position3D from './Position3D';

class SoundObject {
  constructor(object) {
    this.object = object.objects;

    if (object.position) {
      this.position = object.position;
    } else {
      this.position = Position3D(0.0, 0.0, 0.0);
    }

    // this._calculatePan();
  }

  _calculatePan = () => {
    this.object.forEach(object => object.setPan(this.position.x / this.attenuation));
  }

  setPosition = (x, y, z) => {
    this.position = new Position3D(x, y, z);
    this._calculatePan();
  }
  setPositionX = x => {
    this.position.x = x;
    this._calculatePan();
  }
  setPositionY = y => {
    this.position.y = y;
    this._calculatePan();
  }
  setPositionZ = z => {
    this.position.z = z;
    this._calculatePan();
  }

  setAttenuation = (attenuation) => this.attenuation = attenuation;

  play = () => {
    // if (typeof(this.object) === 'array') {
      this.object.forEach(object => object.play());
    // } else {
    //   this.object.play();
    // }
  }

  stop = () => {
    this.object.forEach(object => object.stop());
  }
}

export default SoundObject;

/*
x - left/right
y - front/back
z - top/down
*/