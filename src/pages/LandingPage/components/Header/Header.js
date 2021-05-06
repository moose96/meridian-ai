import React, { useState } from 'react';
import { Link, useTheme } from '@material-ui/core';

import {
  HeaderWrapper,
  Logotype,
  RowBox,
  MenuButton,
} from '../../../../components';
import MenuDialog from '../MenuDialog';
import useIsNarrow from '../../hooks';

export default function Header({ navItems }) {
  const [dialogShow, setDialogShow] = useState(false);
  const theme = useTheme();
  const isNarrow = useIsNarrow();

  const horizontalMenu = (
    <RowBox alignItems="center">
      {navItems.map(({ id, label }) => (
        <Link
          href={`#${id}`}
          color="textPrimary"
          style={{ marginRight: '0.5rem' }}
        >
          {label}
        </Link>
      ))}
    </RowBox>
  );

  return (
    <HeaderWrapper
      bgcolor={theme.palette.background.default}
      style={{
        justifyContent: isNarrow ? 'flex-start' : 'space-between',
        position: 'fixed',
        zIndex: 10,
        top: 0,
      }}
    >
      {isNarrow ? (
        <MenuButton onClick={() => setDialogShow(!dialogShow)} />
      ) : null}
      <Logotype />
      {!isNarrow ? horizontalMenu : null}
      <MenuDialog
        open={dialogShow}
        navItems={navItems}
        onClose={() => setDialogShow(false)}
      />
    </HeaderWrapper>
  );
}
