import React from 'react';
import { v4 as uuid } from 'uuid';
import Provider from 'react-redux';

import store from '../redux/store';
import { SoundCardList } from '../components';

const meta = {
  title: 'SoundCardList',
  component: SoundCardList
}

export default meta;

const data = [{
  id: uuid(),
  name: 'Water test',
  cover: 'https://picsum.photos/id/1002/500/500'
}, {
  id: uuid(),
  name: 'Percussion test',
  cover: 'https://picsum.photos/id/1004/500/500'
}]

export const Primary = args => <SoundCardList {...args} />;
Primary.args = {
  data
}