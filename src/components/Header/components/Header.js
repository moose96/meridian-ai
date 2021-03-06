import React from 'react';
import { Box } from '@material-ui/core';

import HeaderWrapper from '../styled/HeaderWrapper';
import HeaderContent from '../styled/HeaderContent';
import Navigation, { NavItem } from '../../Navigation';
import Logotype from '../../Logotype';

export default function Header() {
  return (
    <HeaderWrapper>
      <Navigation value={0}>
          <NavItem label="Browse" />
          <NavItem label="Play!" />
        </Navigation>
      <HeaderContent>
        <Logotype />
      </HeaderContent>
    </HeaderWrapper>
  );
}