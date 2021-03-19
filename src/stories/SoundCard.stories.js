import { SoundCard } from '../components';

const meta = {
  title: 'SoundCard',
  component: SoundCard
};

export default meta;

export const Primary = args =>
  <SoundCard name="Rain" cover="https://picsum.photos/id/1002/500/500" {...args}/>;

Primary.args = {
  selected: false
}