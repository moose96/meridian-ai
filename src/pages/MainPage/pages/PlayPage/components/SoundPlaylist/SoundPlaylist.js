import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { SecondaryButton } from '../../../../../../components';
import { getPlaylistItems, removeFromPlaylist } from '../../../../../../redux/playlist';

export default function SoundPlaylist() {
  const sounds = useSelector(getPlaylistItems);
  const dispatch = useDispatch();

  return (
    <Paper>
      <List>
        <ListSubheader>
          Playlist
        </ListSubheader>
        {sounds.map(({ id, name }) => (
          <ListItem key={id} button>
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
              <SecondaryButton>
                <Delete onClick={() => dispatch(removeFromPlaylist(id))}/>
              </SecondaryButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}