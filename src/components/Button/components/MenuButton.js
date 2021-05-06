import React from 'react';
import { Menu } from '@material-ui/icons';

import SecondaryButton from './SecondaryButton';

const MenuButton = React.forwardRef(({ onClick }, ref) => {
  return (
    <SecondaryButton ref={ref} onClick={onClick}>
      <Menu />
    </SecondaryButton>
  );
});

export default MenuButton;
