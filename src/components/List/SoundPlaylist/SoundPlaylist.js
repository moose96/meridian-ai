import React from 'react';
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Slide,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { SecondaryButton } from '../../Button';

const SoundPlaylist = React.forwardRef(
  ({ sounds, selected, onRemoveItem, onSelectItem, show }, ref) => {
    return (
      // <Slide direction="up" in={show}>
      //   <Paper style={{ minHeight: '100%' }}>
      <List style={{ minHeight: '100%' }} ref={ref}>
        <ListSubheader>Playlist</ListSubheader>
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
                <Delete onClick={() => onRemoveItem(id)} />
              </SecondaryButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      //   </Paper>
      // </Slide>
    );
  }
);

export default SoundPlaylist;
