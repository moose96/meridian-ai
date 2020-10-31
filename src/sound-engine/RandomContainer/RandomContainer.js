import Container from '../Container';

class RandomContainer extends Container
{
  onPlay = () => {
    console.log('random container play, pan', this.pan);
  }

  play = () => {
    super.play();
    const index = Math.floor(Math.random() * this.sounds.length);
    // this._beforePlay(this.sounds[index]);
    // this.sounds[index].effects = [...this.sounds[index].effects, this.effects]; //not good
    this.sounds[index].play();
  }

  // beforePlay = (callback) => {
  //   this._beforePlay = callback;
  // }
}

export default RandomContainer;