import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

import { RowBox } from '../../Box';
import { SecondaryButton } from '../../Button';
import TransportBarWrapper from '../styled/TransportBarWrapper';
import TransportControls from './TransportControls';
import SoundInfo from './SoundInfo';
import VolumeSlider from './VolumeSlider';

export default function TransportBar(props) {
  const { soundInfo, playlistShow, onPrev, onPlay, onNext, onStop, onPlaylistChange, disabled } = props;
  const { sounds, currentSound } = soundInfo;
  const result = sounds.find(item => item.id === currentSound);

  return (
    <TransportBarWrapper container>
      <Grid item md={2}>
        <RowBox>
          <SecondaryButton
            tooltip={playlistShow ? 'Hide playlist' : 'Show playlist'}
            onClick={() => onPlaylistChange(!playlistShow)}
          >
            {playlistShow ?
              <KeyboardArrowDown /> :
              <KeyboardArrowUp />
            }
          </SecondaryButton>
          <SoundInfo cover={result?.cover} title={result?.name} />
        </RowBox>
      </Grid>
      <Grid item md={8}>
        <TransportControls
          onPlay={() => onPlay()}
          onPrev={() => onPrev()}
          onStop={() => onStop()}
          onNext={() => onNext()}
          disabled={disabled}
        />
      </Grid>
      <Grid item md={2}>
        <VolumeSlider />
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