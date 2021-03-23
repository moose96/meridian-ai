import React from 'react';
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Drawer
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { SecondaryButton } from '../../../../../../components';

export default function SoundPlaylist({ sounds, selected, onRemoveItem, onSelectItem }) {
  return (
    <Paper style={{ minHeight: '100%' }}>
      <List>
        <ListSubheader>
          Playlist
        </ListSubheader>
        {sounds.map(({ id, name }) => (
          <ListItem
            key={id}
            button
            selected={id === selected}
            onClick={() => onSelectItem(id)}
          >
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
              <SecondaryButton>
                <Delete onClick={() => onRemoveItem(id)}/>
              </SecondaryButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}