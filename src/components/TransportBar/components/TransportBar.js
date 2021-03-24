import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import TransportBarWrapper from '../styled/TransportBarWrapper';
import TransportControls from './TransportControls';
import SoundInfo from './SoundInfo';

export default function TransportBar({ soundInfo, onPrev, onPlay, onNext, onStop, disabled }) {
  const { sounds, currentSound } = soundInfo;
  const result = sounds.find(item => item.id === currentSound);

  return (
    <TransportBarWrapper container>
      <Grid item>
        <SoundInfo cover={result?.cover} title={result?.name} />
      </Grid>
      <Grid item>
        <TransportControls
          onPlay={() => onPlay()}
          onPrev={() => onPrev()}
          onStop={() => onStop()}
          onNext={() => onNext()}
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