import React from 'react';
import { LabelledSlider } from '../components/Slider';

const meta = {
  title: 'Slider',
  component: LabelledSlider
};

export default meta;

export const Primary = () => <LabelledSlider label="Slider" valueLabelDisplay="auto" />;