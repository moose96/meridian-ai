import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import SoundCard from '../SoundCard';
import {
  getPlaylistItems,
  addToPlaylist,
  removeFromPlaylist,
} from '../../../redux/playlist';
import { useGuide } from '../../../hooks';

export default function SoundCardList({ data }) {
  const playlistItems = useSelector(getPlaylistItems);
  const dispatch = useDispatch();
  const { guide, style: guideStyle } = useGuide(['browse-add', 'browse-demo']);

  const checkItem = (id) => playlistItems.find((element) => element.id === id);

  return (
    <Grid container spacing={2} style={{ marginTop: '1rem', marginBottom: 0 }}>
      {data.map((item, index) => (
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
          key={item.id}
          style={index === 0 && guide ? guideStyle : undefined}
        >
          <SoundCard
            name={item.name}
            cover={item.cover}
            demo={item.demo}
            selected={checkItem(item.id)}
            onAdd={() => dispatch(addToPlaylist(item))}
            onRemove={() => dispatch(removeFromPlaylist(item))}
          />
        </Grid>
      ))}
    </Grid>
  );
}
