import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import SoundCard from '../SoundCard';
import { getPlaylistItems, addToPlaylist, removeFromPlaylist } from '../../../redux/playlist';

export default function SoundCardList({ data }) {
  const playlistItems = useSelector(getPlaylistItems);
  const dispatch = useDispatch();

  const checkItem = id => playlistItems.find(element => element.id === id);

  return (
    <Grid container spacing={2} >
      {data.map(item => (
        <Grid item md>
          <SoundCard
            key={item.id}
            name={item.name}
            cover={item.cover}
            selected={checkItem(item.id)}
            onAdd={() => dispatch(addToPlaylist(item))}
            onRemove={() => dispatch(removeFromPlaylist(item))}
          />
        </Grid>
      ))}
    </Grid>
  );
}
