import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { TransportButton } from '../../../Button';
import { GuideTooltip } from '../../../Guide';

export default function TransportControls({
  onPrev,
  onPlay,
  onNext,
  onStop,
  disabled,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (onPlay) {
      onPlay();
    }
  };

  const handleStopClick = () => {
    setIsPlaying(false);
    if (onStop) {
      onStop();
    }
  };

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
      <GuideTooltip frames={['play-transport-prev']}>
        <Grid item>
          <TransportButton
            type="prev"
            onClick={() => onPrev && onPrev()}
            disabled={disabled}
          />
        </Grid>
      </GuideTooltip>
      <GuideTooltip frames={['play-transport-play']}>
        <Grid item>{isPlaying ? stopButton : playButton}</Grid>
      </GuideTooltip>
      <GuideTooltip frames={['play-transport-next']}>
        <Grid item>
          <TransportButton
            type="next"
            onClick={() => onNext && onNext()}
            disabled={disabled}
          />
        </Grid>
      </GuideTooltip>
    </Grid>
  );
}

TransportControls.propTypes = {
  onPrev: PropTypes.func,
  onPlay: PropTypes.func,
  onNext: PropTypes.func,
  onStop: PropTypes.func,
};
