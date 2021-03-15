import { v4 as uuid } from 'uuid';

import Snapshot from './Snapshot';

describe('test Snapshot', () => {
  describe('test calculating similarity', () => {
    const soundID = uuid();

    const testSnapshot = new Snapshot();
    testSnapshot.setSoundParams(soundID, {
      width: 50,
      distance: 50,
      sharpness: 50,
      brightness: 50,
      intensivity: 50,
      volume: 50
    });

    const otherSnapshot = new Snapshot();
    otherSnapshot.setSoundParams(soundID, {
      width: 60,
      distance: 60,
      sharpness: 60,
      brightness: 60,
      intensivity: 60,
      volume: 60
    })

    it('should similarity equals to 90%', () => {
      expect(testSnapshot.calculateSimilarity(otherSnapshot)).toEqual(0.9);
    })
  });
});