import Container from '../Container';
class SequenceContainer extends Container
{
  name = 'Sequence Container';
  #currentSound = 0;

  constructor(object) {
    super(object);
    this.type = 'SequenceContainer'; //due to webpack issue
  }

  async onPlay() {
    while (this.#currentSound !== this.source.length) {
      await this.source[this.#currentSound].play();
      this.#currentSound++;
    }

    this.#currentSound = 0;
  }
}

export default SequenceContainer;