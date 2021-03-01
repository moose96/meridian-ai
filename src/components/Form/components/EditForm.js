import React from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { LabelledSlider } from '../../Slider';
import { PrimaryButton, SecondaryButton, SnapshotButton } from '../../Button';

export default function EditForm() {
  return (
    <div>
      <Typography variant="h2" color="textPrimary">Edycja parametrów</Typography>
      <ToggleButtonGroup exclusive>
        <SnapshotButton value={1}>1</SnapshotButton>
        <SnapshotButton value={2}>2</SnapshotButton>
        <SnapshotButton value={3}>3</SnapshotButton>
        <SnapshotButton value={4}>4</SnapshotButton>
        <SnapshotButton value={5}>5</SnapshotButton>
        <SnapshotButton value={6}>6</SnapshotButton>
      </ToggleButtonGroup>
      <LabelledSlider label="Intensywność" />
      <LabelledSlider label="Szerokość" />
      <LabelledSlider label="Odległość" />
      <LabelledSlider label="Jasność" />
      <LabelledSlider label="Ostrość" />
      <LabelledSlider label="Głośność" />
      <div>
        <SecondaryButton>Zapisz i zakończ</SecondaryButton>
        <PrimaryButton>Następny</PrimaryButton>
      </div>
    </div>
  )
}