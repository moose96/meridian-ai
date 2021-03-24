import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { TransportButton } from '../../../Button';

export default function TransportControls({ onPrev, onPlay, onNext, onStop, disabled }) {
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
    <Grid container justify="center" spacing={1}>
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
    </Grid>
  )
}

TransportControls.propTypes = {
  onPrev: PropTypes.func,
  onPlay: PropTypes.func,
  onNext: PropTypes.func,
  onStop: PropTypes.func
}