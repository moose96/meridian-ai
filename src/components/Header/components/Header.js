import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useMediaQuery } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import HeaderWrapper from '../styled/HeaderWrapper';
import HeaderContent from '../styled/HeaderContent';
import Navigation, { NavItem } from '../../Navigation';
import Logotype from '../../Logotype';
import SidebarMenu from '../../SidebarMenu';
import { SecondaryButton } from '../../Button';

import { mainMenu } from '../../../constants';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('browse');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const navigate = useNavigate();
  const portrait = useMediaQuery('(orientation: portrait)');

  useEffect(() => {
    navigate(currentPage);
  }, [currentPage, navigate]);

  return (
    <HeaderWrapper>
      <SidebarMenu
        show={showSideMenu}
        currentPage={currentPage}
        onSetCurrentPage={(value) => setCurrentPage(value)}
        onClose={() => setShowSideMenu(false)}
      />
      {portrait ? (
        <SecondaryButton onClick={() => setShowSideMenu(!showSideMenu)}>
          <Menu />
        </SecondaryButton>
      ) : (
        <Navigation
          value={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        >
          {/* <NavItem label="Browse" value="browse" />
          <NavItem label="Play!" value="play" /> */}
          {mainMenu.map((element) => (
            <NavItem
              key={element.id}
              label={element.title}
              value={element.id}
            />
          ))}
        </Navigation>
      )}
      <HeaderContent>
        <Logotype />
      </HeaderContent>
    </HeaderWrapper>
  );
}
