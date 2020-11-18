import Container from '../base/Container';

class RandomContainer extends Container
{
  name = 'Random Container';
  type = 'RandomContainer'; //due to webpack issue
  play() {
    super.play();
    const index = Math.floor(Math.random() * this.source.length);
    this.source[index].play();
  }
}

export default RandomContainer;