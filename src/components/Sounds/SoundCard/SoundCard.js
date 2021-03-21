import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '@material-ui/core';

import { CardMediaStyled, CardActionsStyled } from './styled';
import {AddButton, RemoveButton, PlayDemoButton, StopDemoButton } from './components';
import MediaPlayer, { useMediaPlayer } from '../../MediaPlayer';

export default function SoundCard({ name, cover, demo, selected, onAdd, onRemove }) {
  const [playing, setPlaying] = useState(false);
  const { ref, play, stop } = useMediaPlayer();

  const handleChangePlaying = () => {
    setPlaying(!playing);
  }

  useEffect(() => {
    if (playing) {
      play();
    } else {
      stop();
    }
  }, [playing]);

  return (
    <Card style={{ maxWidth: 400 }}>
      <MediaPlayer
        ref={ref}
        source={demo}
        type="audio/mpeg"
      />
      <CardHeader title={name} />
      <CardMediaStyled image={cover} />
      <CardActionsStyled>
        {playing ?
          <StopDemoButton onClick={handleChangePlaying} /> : (
          <PlayDemoButton
            onClick={handleChangePlaying}
            disabled={!demo}
            tooltipDisabled="Demo of this sound is unavailable"
          />
          )}
        {selected ?
          <RemoveButton onClick={() => onRemove()} /> :
          <AddButton onClick={() => onAdd()} />}
      </CardActionsStyled>
    </Card>
  );
}