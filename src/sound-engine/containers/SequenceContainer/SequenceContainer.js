import Container from '../Container';
class SequenceContainer extends Container
{
  name = 'Sequence Container';

  constructor(object) {
    super(object);
    this.type = 'SequenceContainer'; //due to webpack issue
  }

  onPlay() {
    this.source.forEach(sound => sound.play()); //parallel container!!!
  }
}

export default SequenceContainer;