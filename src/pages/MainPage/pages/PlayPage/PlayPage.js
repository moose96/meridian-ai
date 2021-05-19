import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Slide, Paper } from '@material-ui/core';

import {
  ColumnBox,
  TransportBar,
  Loading,
  SoundPlaylist,
  GuideTooltip,
} from '../../../../components';
import { useAIComposer, useOrientation, useGuide } from '../../../../hooks';
import {
  getPlaylistItems,
  removeFromPlaylist,
} from '../../../../redux/playlist';
import { OrientationRoute } from '../../../../containers';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const [currentSound, setCurrentSound] = useState('');
  const [playlistShow, setPlaylistShow] = useState(true);
  const sounds = useSelector(getPlaylistItems);
  const dispatch = useDispatch();
  const { prev, next, start, stop, loading } = useAIComposer({
    oscillate,
    sound: currentSound,
  });
  const { portrait, landscape } = useOrientation();
  const { guide, style: guideStyle } = useGuide(['play-playlist']);

  useEffect(() => {
    if (sounds.length > 0 && currentSound.length === 0) {
      setCurrentSound(sounds[0].id);
    }
  }, [sounds, currentSound]);

  const handleNext = () => {
    if (oscillate) {
      setOscillate(false);
    }

    next();
  };

  const handlePrev = () => {
    if (oscillate) {
      setOscillate(false);
    }

    prev();
  };

  const handleSelectItem = (id) => {
    setCurrentSound(id);
  };

  const soundPlaylist = (
    <GuideTooltip
      frames={['play-playlist']}
      placement={landscape ? 'right' : 'bottom'}
    >
      <SoundPlaylist
        sounds={sounds}
        selected={currentSound}
        onRemoveItem={(id) => dispatch(removeFromPlaylist(id))}
        onSelectItem={handleSelectItem}
        show={playlistShow}
        style={guide ? guideStyle : undefined}
      />
    </GuideTooltip>
  );

  const content = (
    <ColumnBox fluid style={{ height: '100%' }}>
      {portrait && playlistShow ? soundPlaylist : null}
      {loading ? <Loading /> : null}
    </ColumnBox>
  );

  return (
    <>
      <OrientationRoute
        landscape={
          <Grid
            container
            style={{ flex: 1, overflow: 'hidden', position: 'relative' }}
          >
            <Grid item md={2} style={guide ? guideStyle : undefined}>
              <Slide direction="up" in={playlistShow}>
                <Paper style={{ minHeight: '100%' }}>{soundPlaylist}</Paper>
              </Slide>
            </Grid>
            <Grid item md={10}>
              {content}
            </Grid>
          </Grid>
        }
        portrait={content}
      />
      <TransportBar
        soundInfo={{ sounds, currentSound }}
        playlistShow={playlistShow}
        asmrActive={oscillate}
        onPrev={handlePrev}
        onNext={handleNext}
        onPlay={() => start()}
        onStop={() => stop()}
        onPlaylistChange={(value) => setPlaylistShow(value)}
        onASMRClick={(value) => setOscillate(value)}
        disabled={loading}
      />
    </>
  );
}
