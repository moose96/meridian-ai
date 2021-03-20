import React, { useState } from 'react';
import { Card, CardHeader } from '@material-ui/core';

import { CardMediaStyled, CardActionsStyled } from './styled';
import { AddButton, RemoveButton, PlayDemoButton, StopDemoButton } from './components';

export default function SoundCard({ name, cover, selected, onAdd, onRemove }) {
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
          <RemoveButton onClick={() => onRemove()} /> :
          <AddButton onClick={() => onAdd()} />}
      </CardActionsStyled>
    </Card>
  );
}