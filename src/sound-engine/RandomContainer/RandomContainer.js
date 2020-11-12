import Container from '../base/Container';

class RandomContainer extends Container
{
  play() {
    super.play();
    const index = Math.floor(Math.random() * this.source.length);
    this.source[index].play();
  }
}

export default RandomContainer;