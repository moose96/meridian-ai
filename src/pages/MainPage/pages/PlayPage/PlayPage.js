import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Slide, Paper } from '@material-ui/core';

import {
  ColumnBox,
  TransportBar,
  Loading,
  SoundPlaylist,
} from '../../../../components';
import { useAIComposer, useOrientation } from '../../../../hooks';
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
  const { portrait } = useOrientation();

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

  const soundPlaylist = (
    <SoundPlaylist
      sounds={sounds}
      selected={currentSound}
      onRemoveItem={(id) => dispatch(removeFromPlaylist(id))}
      onSelectItem={(id) => setCurrentSound(id)}
      show={playlistShow}
    />
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
            <Grid item md={2}>
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
      />
    </>
  );
}
