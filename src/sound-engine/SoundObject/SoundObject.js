import Position3D from './Position3D';

class SoundObject {
  constructor(object) {
    this.id = Math.floor(Math.random() * 200);
    this.objects = object.objects;
    this.attenuation = 0;
    this.muted = false;

    if (object.position) {
      this.position = object.position;
    } else {
      this.position = Position3D(0.0, 0.0, 0.0);
    }

    this._calculate();
  }

  _calculate() {
    // this.objects.forEach(object => object.setPan(this.position.x / this.attenuation));
    throw Error('This class has to be extended by another class');
  }

  setMuted(muted) {
    this.muted = muted;
  }

  setPosition = (x, y, z) => {
    this.position = Position3D(x, y, z);
    this._calculate();
  }
  setPositionX = x => {
    this.position.x = x;
    this._calculate();
  }
  setPositionY = y => {
    this.position.y = y;
    this._calculate();
  }
  setPositionZ = z => {
    this.position.z = z;
    this._calculate();
  }

  setAttenuation = (attenuation) => {
    this.attenuation = attenuation;
    this._calculate();
  }

  play = () => {
    // if (typeof(this.object) === 'array') {
    if (!this.muted) {
      this.objects.forEach(object => object.play());
    }
    // } else {
    //   this.object.play();
    // }
  }

  stop = () => {
    this.objects.forEach(object => object.stop());
  }
}

export default SoundObject;

/*
x - left/right
y - front/back
z - top/down
*/