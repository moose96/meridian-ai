// import Pizzicato from 'pizzicato';

import Sound from './Sound';

describe('test Sound object', () => {
  const testSound = {
    filename: '/data/sound_01.wav',
    randomization: {
      key: 'pan',
      offset: 0.5
    },
    volume: 0.7,
    pan: 0.1,
    delay: 0.1,
    startPoint: 0.2,
    muted: false,
    detune: -1
  };

  it('should create pattern object', () => {
    const sound = new Sound(testSound);

    //expect buffer of sound to be buffer of pizzicato sound
    expect(sound.volume).toEqual(testSound.volume);
    expect(sound.pan).toEqual(testSound.pan);
    expect(sound.delay).toEqual(testSound.delay);
    expect(sound.startPoint).toEqual(testSound.startPoint);
    expect(sound.muted).toEqual(testSound.muted);
  })
});
