import Container from './Container';
import Sound from '../../Sound';

describe('test Container class', () => {
  const testObject = {
    objects: [new Sound(), new Sound(), new Sound()],
    volume: 0.5
  };

  it ('should create Container object', () => {
    const container = new Container(testObject);

    expect(container.sounds).toBe(testObject.objects);
    expect(container.volume).toEqual(testObject.volume);
  });
});
