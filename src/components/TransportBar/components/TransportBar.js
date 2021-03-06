import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import TransportBarWrapper from '../styled/TransportBarWrapper';
import { TransportButton } from '../../Button';

export default function TransportBar({ onPrev, onPlay, onNext, onStop }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (onPlay) {
      onPlay();
    }
  }

  const handleStopClick = () => {
    setIsPlaying(false);
    if (onStop) {
      onStop();
    }
  }

  const playButton = (
    <TransportButton
      type="play"
      onClick={handlePlayClick}
    />
  );

  const stopButton = (
    <TransportButton
      type="stop"
      onClick={handleStopClick}
    />
  );

  return (
    <TransportBarWrapper container spacing={1}>
      <Grid item>
        <TransportButton type="prev" onClick={() => onPrev && onPrev()}/>
      </Grid>
      <Grid item>
        {isPlaying ? stopButton : playButton}
      </Grid>
      <Grid item>
        <TransportButton type="next" onClick={() => onNext && onNext()} />
      </Grid>
    </TransportBarWrapper>
  )
}

TransportBar.propTypes = {
  onPrev: PropTypes.func,
  onPlay: PropTypes.func,
  onNext: PropTypes.func,
  onStop: PropTypes.func
}