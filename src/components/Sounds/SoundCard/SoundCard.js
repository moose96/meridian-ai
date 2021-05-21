import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '@material-ui/core';

import { CardMediaStyled, CardActionsStyled } from './styled';
import {
  AddButton,
  RemoveButton,
  PlayDemoButton,
  StopDemoButton,
} from './components';
import MediaPlayer, { useMediaPlayer } from '../../MediaPlayer';
import { GuideTooltip } from '../../Guide';

export default function SoundCard({
  name,
  cover,
  demo,
  selected,
  onAdd,
  onRemove,
  showGuideTooltip,
}) {
  const [playing, setPlaying] = useState(false);
  const { ref, play, stop } = useMediaPlayer();

  const handleChangePlaying = () => {
    if (!playing) {
      play();
    } else {
      stop();
    }
    setPlaying(!playing);
  };

  // useEffect(() => {
  //   if (!playing) {
  //     play();
  //   } else {
  //     stop();
  //   }
  // }, [playing]);

  return (
    <Card style={{ maxWidth: 400 }}>
      <MediaPlayer ref={ref} source={demo} type="audio/mpeg" />
      <CardHeader title={name} />
      <CardMediaStyled image={cover} />
      <CardActionsStyled>
        {playing ? (
          <StopDemoButton onClick={handleChangePlaying} />
        ) : (
          <GuideTooltip frames={['browse-demo']} show={showGuideTooltip}>
            <PlayDemoButton
              onClick={handleChangePlaying}
              disabled={!demo}
              tooltipDisabled="Demo of this sound is unavailable"
            />
          </GuideTooltip>
        )}
        {selected ? (
          <RemoveButton onClick={() => onRemove()} />
        ) : (
          <GuideTooltip frames={['browse-add']} show={showGuideTooltip}>
            <AddButton onClick={() => onAdd()} />
          </GuideTooltip>
        )}
      </CardActionsStyled>
    </Card>
  );
}
