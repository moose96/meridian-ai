import Container from '../Container';

class RandomContainer extends Container
{
  name = 'Random Container';
  type = 'RandomContainer'; //due to webpack issue

  onPlay() {
    const index = Math.floor(Math.random() * this.source.length);
    this.source[index].play();
  }
}

export default RandomContainer;