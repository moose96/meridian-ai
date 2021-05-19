import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useMediaQuery } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';

import HeaderWrapper from '../styled/HeaderWrapper';
import HeaderContent from '../styled/HeaderContent';
import Navigation, { NavItem } from '../../Navigation';
import Logotype from '../../Logotype';
import SidebarMenu from '../../SidebarMenu';
import { SecondaryButton, MenuButton } from '../../Button';
import { useGuide } from '../../../hooks';
import { GuideTooltip } from '../../Guide';
import { resetVisited } from '../../../redux/guide';
import { getPlaylistItems } from '../../../redux/playlist';
import { mainMenu } from '../../../constants';
import { RowBox } from '../../Box';
import SettingsControl from '../../SettingsControl';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('browse');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const navigate = useNavigate();
  const portrait = useMediaQuery('(orientation: portrait)');
  const { guide, style: guideStyle } = useGuide(['navigation']);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const playlistItems = useSelector(getPlaylistItems);

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
          <MenuButton onClick={() => setShowSideMenu(!showSideMenu)} />
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
                label={t(`menu.${element.id}`)}
                value={element.id}
              />
            ))}
          </Navigation>
        </GuideTooltip>
      )}
      <HeaderContent>
        <Logotype />
        <RowBox>
          <SettingsControl />
          <SecondaryButton
            tooltip="View guide"
            onClick={() => dispatch(resetVisited(location.pathname))}
          >
            <Help />
          </SecondaryButton>
        </RowBox>
      </HeaderContent>
    </HeaderWrapper>
  );
}
