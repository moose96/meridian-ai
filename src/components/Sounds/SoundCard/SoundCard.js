import React, { useState } from 'react';
import {
  Card,
  CardHeader,
} from '@material-ui/core';

import CardMediaStyled from './styled/CardMediaStyled';
import CardActionsStyled from './styled/CardActionsStyled';
import PlayDemoButton from './components/PlayDemoButton';
import StopDemoButton from './components/StopDemoButton';
import AddButton from './components/AddButton';
import RemoveButton from './components/RemoveButton';

export default function SoundCard({ name, cover, selected }) {
  const [playing, setPlaying] = useState(false);

  const handleChangePlaying = () => {
    setPlaying(!playing);
  }

  return (
    <Card style={{ maxWidth: 400 }}>
      <CardHeader title={name} />
      <CardMediaStyled image={cover} />
      <CardActionsStyled>
        {playing ?
          <StopDemoButton onClick={handleChangePlaying} /> :
          <PlayDemoButton onClick={handleChangePlaying} />}
        {selected ?
          <RemoveButton /> :
          <AddButton />}
      </CardActionsStyled>
    </Card>
  );
}