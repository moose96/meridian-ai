import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import { ColumnBox, TransportBar, Loading } from '../../../../components';
import { useAIComposer } from '../../../../hooks';
import SoundPlaylist from './components/SoundPlaylist';
import { getPlaylistItems, removeFromPlaylist } from '../../../../redux/playlist';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const [currentSound, setCurrentSound] = useState('');
  const [playlistShow, setPlaylistShow] = useState(true);
  const sounds = useSelector(getPlaylistItems);
  const dispatch = useDispatch();
  const { prev, next, start, stop, loading } = useAIComposer({ oscillate, sound: currentSound });

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
  }

  const handlePrev = () => {
    if (oscillate) {
      setOscillate(false);
    }

    prev();
  }

  return (
    <>
      <Grid
        container
        style={{ flex: 1, overflow: 'hidden',  position: 'relative'  }}
      >
        <Grid item md={2}>
          <SoundPlaylist
            sounds={sounds}
            selected={currentSound}
            onRemoveItem={id => dispatch(removeFromPlaylist(id))}
            onSelectItem={id => setCurrentSound(id)}
            show={playlistShow}
          />
        </Grid>
        <Grid item md={10}>
          <ColumnBox
            reverse
            fluid
            style={{ height: '100%' }}
          >
            {loading && <Loading />}
          </ColumnBox>
        </Grid>
      </Grid>
      <TransportBar
        soundInfo={{ sounds, currentSound }}
        playlistShow={playlistShow}
        asmrActive={oscillate}
        onPrev={handlePrev}
        onNext={handleNext}
        onPlay={() => start()}
        onStop={() => stop()}
        onPlaylistChange={value => setPlaylistShow(value)}
        onASMRClick={value => setOscillate(value)}
      />
    </>
  );
}