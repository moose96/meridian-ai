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
import { useGuide } from '../../../hooks';
import { GuideTooltip } from '../../Guide';

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
  const { guide, style: guideStyle } = useGuide([
    'play-playlist-hide',
    'play-transport-play',
    'play-transport-next',
    'play-transport-prev',
    'play-asmr-button',
    'play-volume',
  ]);

  const handleVolumeChange = (event, value) => {
    SoundEngine.setMasterVolume(value);
    setMasterVolume(value);
  };

  return (
    <TransportBarWrapper container style={guide ? guideStyle : undefined}>
      <Grid item md={3}>
        <SoundControls
          playlist={{ show: playlistShow, onChange: onPlaylistChange }}
          soundInfo={{ cover: result?.cover, title: result?.name }}
        />
      </Grid>
      <Grid item md={6} style={{ position: 'relative' }}>
        <ASMRButtonContainer>
          <GuideTooltip frames={['play-asmr-button']} placement="top">
            <ASMRButton
              active={asmrActive}
              onClick={() => onASMRClick(!asmrActive)}
            />
          </GuideTooltip>
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
