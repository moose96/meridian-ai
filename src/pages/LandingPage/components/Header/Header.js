import React, { useState, useCallback } from 'react';
import { useTheme } from '@material-ui/core';

import {
  HeaderWrapper,
  Logotype,
  RowBox,
  MenuButton,
  SettingsControl,
} from '../../../../components';
import MenuDialog from '../MenuDialog';
import useIsNarrow from '../../hooks';
import Link from './components';

export default function Header({ navItems }) {
  const [dialogShow, setDialogShow] = useState(false);
  const [currentElement, setCurrentElement] = useState('');
  const isNarrow = useIsNarrow();
  const theme = useTheme();

  const links = navItems.map(({ id, label }) => (
    <Link
      key={`link-${id}-${label}`}
      to={id}
      active={currentElement === id}
      onSetActive={(to) => setCurrentElement(to)}
    >
      {label}
    </Link>
  ));

  const horizontalMenu = (
    <RowBox alignItems="center">
      {links}
      <SettingsControl />
    </RowBox>
  );

  return (
    <HeaderWrapper
      bgcolor={theme.palette.background.default}
      style={{
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: 10,
        top: 0,
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <RowBox>
        {isNarrow ? (
          <MenuButton onClick={() => setDialogShow(!dialogShow)} />
        ) : null}
        <Logotype />
      </RowBox>
      {!isNarrow ? horizontalMenu : <SettingsControl />}
      {isNarrow ? (
        <MenuDialog
          open={dialogShow}
          Links={links}
          onClose={() => setDialogShow(false)}
        />
      ) : null}
    </HeaderWrapper>
  );
}
