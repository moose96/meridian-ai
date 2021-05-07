import React, { useState } from 'react';
import { Link, useTheme, Box } from '@material-ui/core';
import { scroller } from 'react-scroll';

import {
  HeaderWrapper,
  Logotype,
  RowBox,
  MenuButton,
  SettingsControl,
} from '../../../../components';
import MenuDialog from '../MenuDialog';
import useIsNarrow from '../../hooks';
import scrollSettings from '../../constants/scrollSettings';

export default function Header({ navItems }) {
  const [dialogShow, setDialogShow] = useState(false);
  const theme = useTheme();
  const isNarrow = useIsNarrow();

  const headerSizePx = theme.sizes.header * theme.typography.htmlFontSize;

  // useEffect(() => {
  //   Events.scrollEvent.register('end', (to) =>
  //     console.log(scroller.getActiveLink())
  //   );

  //   return () => {
  //     Events.scrollEvent.remove('end');
  //   };
  // }, []);

  const handleLinkClick = (id, event) => {
    scroller.scrollTo(id, scrollSettings(headerSizePx));
    event.preventDefault();
  };

  const horizontalMenu = (
    <RowBox alignItems="center">
      {navItems.map(({ id, label }) => (
        <Link
          href={`#${id}`}
          color="textPrimary"
          style={{ marginRight: '0.5rem' }}
          onClick={(event) => handleLinkClick(id, event)}
        >
          {label}
        </Link>
      ))}
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
      }}
    >
      <RowBox>
        {isNarrow ? (
          <MenuButton onClick={() => setDialogShow(!dialogShow)} />
        ) : null}
        <Logotype />
      </RowBox>
      {!isNarrow ? horizontalMenu : <SettingsControl />}
      <MenuDialog
        open={dialogShow}
        navItems={navItems}
        onClose={() => setDialogShow(false)}
        onLinkClick={handleLinkClick}
      />
    </HeaderWrapper>
  );
}
