import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

import { mainMenu } from '../../constants';

export default function SidebarMenu({
  show,
  currentPage,
  onSetCurrentPage,
  onClose,
}) {
  return (
    <Drawer anchor="left" open={show} onClose={onClose}>
      <div role="presentation" onClick={onClose} style={{ width: 250 }}>
        <List>
          {mainMenu.map((element) => (
            <ListItem
              button
              key={element.id}
              selected={currentPage === element.id}
              onClick={() => onSetCurrentPage(element.id)}
            >
              <ListItemText primary={element.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
