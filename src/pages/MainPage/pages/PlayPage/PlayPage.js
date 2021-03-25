import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import { ColumnBox, CenteredRowBox, TransportBar, ASMRButton, Loading } from '../../../../components';
import { useAIComposer } from '../../../../hooks';
import SoundPlaylist from './components/SoundPlaylist';
import { getPlaylistItems, removeFromPlaylist } from '../../../../redux/playlist'
import ASMRButtonContainer from './styled/ASMRButtonContainer';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const [currentSound, setCurrentSound] = useState('');
  const [playlistShow, setPlaylistShow] = useState(false);
  const sounds = useSelector(getPlaylistItems);
  const dispatch = useDispatch();
  const { prev, next, start, stop, loading } = useAIComposer({ oscillate, sound: currentSound });
  // const { loading, current, max } = progress;

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
            <ASMRButtonContainer>
              <ASMRButton active={oscillate} onClick={() => setOscillate(!oscillate)} />
            </ASMRButtonContainer>
            {loading && <Loading />}
          </ColumnBox>
        </Grid>
      </Grid>
      <TransportBar
        soundInfo={{ sounds, currentSound }}
        playlistShow={playlistShow}
        onPrev={() => prev()}
        onNext={() => next()}
        onPlay={() => start()}
        onStop={() => stop()}
        onPlaylistChange={value => setPlaylistShow(value)}
      />
    </>
  );
}