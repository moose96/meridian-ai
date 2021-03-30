import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

import { ASMRButton } from '../../Button';
import SoundEngine from '../../../sound-engine';
import { RowBox } from '../../Box';
import { SecondaryButton } from '../../Button';
import TransportBarWrapper from '../styled/TransportBarWrapper';
import TransportControls from './TransportControls';
import SoundInfo from './SoundInfo';
import VolumeSlider from './VolumeSlider';
import ASMRButtonContainer from '../styled/ASMRButtonContainer';

export default function TransportBar(props) {
  const {
    soundInfo,
    playlistShow,
    asmrActive,
    onPrev,
    onPlay,
    onNext,
    onStop,
    onPlaylistChange,
    onASMRClick,
    disabled } = props;

  const { sounds, currentSound } = soundInfo;
  const result = sounds.find(item => item.id === currentSound);
  const [masterVolume, setMasterVolume] = useState(1.0);

  const handleVolumeChange = (event, value) => {
    SoundEngine.setMasterVolume(value);
    setMasterVolume(value);
  }

  return (
    <TransportBarWrapper container>
      <Grid item md={3}>
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
      <Grid item md={6} style={{ position: 'relative' }}>
        <ASMRButtonContainer>
          <ASMRButton active={asmrActive} onClick={() => onASMRClick(!asmrActive)} />
        </ASMRButtonContainer>
        <TransportControls
          onPlay={() => onPlay()}
          onPrev={() => onPrev()}
          onStop={() => onStop()}
          onNext={() => onNext()}
          disabled={disabled}
        />
      </Grid>
      <Grid item md={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <VolumeSlider
          value={masterVolume}
          onChange={handleVolumeChange}
          style={{ width: '75%' }}
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