import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Divider
} from '@material-ui/core';

export default function SoundCategoriesList() {
  return (
    <Paper style={{ minHeight: '100%' }}>
      <List>
        <ListItem button selected>
          <ListItemText primary="All sounds" />
        </ListItem>
        <Divider />
        <ListSubheader>Categories</ListSubheader>
        <ListItem button>
          <ListItemText primary="Other" />
        </ListItem>
      </List>
    </Paper>
  );
}