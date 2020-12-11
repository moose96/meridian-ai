import Container from '../Container';

class ParallelContainer extends Container
{
  name = 'Parallel Container';
  type = 'ParallelContainer';

  onPlay() {
    this.source.forEach(source => source.play());
  }
}

export default ParallelContainer;