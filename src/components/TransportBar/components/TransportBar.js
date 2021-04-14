import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { ASMRButton } from '../../Button';
import SoundEngine from '../../../sound-engine';
import TransportBarWrapper from '../styled/TransportBarWrapper';
import TransportControls from './TransportControls';
import SoundControls from './SoundControls';
import VolumeControl from './VolumeControl';
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
    disabled,
  } = props;

  const { sounds, currentSound } = soundInfo;
  const result = sounds.find((item) => item.id === currentSound);
  const [masterVolume, setMasterVolume] = useState(1.0);

  const handleVolumeChange = (event, value) => {
    SoundEngine.setMasterVolume(value);
    setMasterVolume(value);
  };

  return (
    <TransportBarWrapper container>
      <Grid item md={3}>
        <SoundControls
          playlist={{ show: playlistShow, onChange: onPlaylistChange }}
          soundInfo={{ cover: result?.cover, title: result?.name }}
        />
      </Grid>
      <Grid item md={6} style={{ position: 'relative' }}>
        <ASMRButtonContainer>
          <ASMRButton
            active={asmrActive}
            onClick={() => onASMRClick(!asmrActive)}
          />
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
        <VolumeControl value={masterVolume} onChange={handleVolumeChange} />
      </Grid>
    </TransportBarWrapper>
  );
}

TransportBar.propTypes = {
  onPrev: PropTypes.func,
  onPlay: PropTypes.func,
  onNext: PropTypes.func,
  onStop: PropTypes.func,
};
