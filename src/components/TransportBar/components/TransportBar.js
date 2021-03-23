import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import TransportBarWrapper from '../styled/TransportBarWrapper';
import { TransportButton } from '../../Button';

export default function TransportBar({ onPrev, onPlay, onNext, onStop, disabled }) {
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
      disabled={disabled}
    />
  );

  const stopButton = (
    <TransportButton
      type="stop"
      onClick={handleStopClick}
      disabled={disabled}
    />
  );

  return (
    <TransportBarWrapper container spacing={1}>
      <Grid item>
        <TransportButton
          type="prev"
          onClick={() => onPrev && onPrev()}
          disabled={disabled}
        />
      </Grid>
      <Grid item>
        {isPlaying ? stopButton : playButton}
      </Grid>
      <Grid item>
        <TransportButton
          type="next"
          onClick={() => onNext && onNext()}
          disabled={disabled}
        />
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