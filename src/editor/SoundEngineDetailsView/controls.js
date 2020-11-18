import React from 'react';

import Input from '../../ui/Input';
import Slider from '../../ui/Slider';
import Number from '../../ui/Number';

const controls = {
  volume: <Slider min={0} max={1} step={0.01} />,
  pan: <Slider min={-1} max={1} step={0.01} />,
  muted: <Input type="checkbox" />
}

export default controls;