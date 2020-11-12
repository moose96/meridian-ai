import Container from '../Container';

class RandomContainer extends Container
{
  // onPlay () {
  //   console.log('random container play, pan', this.pan);
  // }

  play() {
    super.play();
    const index = Math.floor(Math.random() * this.source.length);
    this.source[index].play();
  }
}

export default RandomContainer;