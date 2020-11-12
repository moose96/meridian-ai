import SoundEngineObject from './SoundEngineObject';

describe('test SoundEngineObject', () => {
  const source = {
    filename: "test.wav",
    volume: 0.5,
    pan: 1,
    randomization: {
      key: "pan",
      offset: 0.4
    }
  };

  it('should create with given parameters', () => {
    const object = new SoundEngineObject(source);

    expect(object.volume).toEqual(source.volume);
    expect(object.pan).toEqual(source.pan);
  });

  it('should change volume', () => {
    const object = new SoundEngineObject(source);

    object.volume = 0.2;

    expect(object.volume).toEqual(0.2);
  });

  it('should change pan', () => {
    const object = new SoundEngineObject(source);

    object.pan = -0.5;
    expect(object.pan).toEqual(-0.5);
  });
});
