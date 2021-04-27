import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useMediaQuery } from '@material-ui/core';
import { Menu, Help } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useLocation } from '@reach/router';

import HeaderWrapper from '../styled/HeaderWrapper';
import HeaderContent from '../styled/HeaderContent';
import Navigation, { NavItem } from '../../Navigation';
import Logotype from '../../Logotype';
import SidebarMenu from '../../SidebarMenu';
import { SecondaryButton } from '../../Button';
import { useGuide } from '../../../hooks';
import { GuideTooltip } from '../../Guide';
import { resetVisited } from '../../../redux/guide';

import { mainMenu } from '../../../constants';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('browse');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const navigate = useNavigate();
  const portrait = useMediaQuery('(orientation: portrait)');
  const { guide, style: guideStyle } = useGuide(['navigation']);
  const dispatch = useDispatch();
  const location = useLocation();

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
        <GuideTooltip frames={['navigation']}>
          <SecondaryButton onClick={() => setShowSideMenu(!showSideMenu)}>
            <Menu />
          </SecondaryButton>
        </GuideTooltip>
      ) : (
        <GuideTooltip frames={['navigation']}>
          <Navigation
            value={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            style={guide ? guideStyle : undefined}
          >
            {mainMenu.map((element) => (
              <NavItem
                key={element.id}
                label={element.title}
                value={element.id}
              />
            ))}
          </Navigation>
        </GuideTooltip>
      )}
      <HeaderContent>
        <Logotype />
        <SecondaryButton
          tooltip="View guide"
          onClick={() => dispatch(resetVisited(location.pathname))}
        >
          <Help />
        </SecondaryButton>
      </HeaderContent>
    </HeaderWrapper>
  );
}
