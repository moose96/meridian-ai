import Container from '../Container';

class RandomContainer extends Container
{
  onPlay () {
    console.log('random container play, pan', this.pan);
  }

  play() {
    super.play();
    const index = Math.floor(Math.random() * this.sounds.length);
    this.sounds[index].play();
  }
}

export default RandomContainer;