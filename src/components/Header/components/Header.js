import React, { useState, useEffect } from 'react';
import {useNavigate } from '@reach/router';

import HeaderWrapper from '../styled/HeaderWrapper';
import HeaderContent from '../styled/HeaderContent';
import Navigation, { NavItem } from '../../Navigation';
import Logotype from '../../Logotype';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('browse');
  const navigate = useNavigate();

  useEffect(() => {
    navigate(currentPage);
  }, [currentPage, navigate]);

  return (
    <HeaderWrapper>
      <Navigation value={currentPage} onChange={(event, value) => setCurrentPage(value)}>
          <NavItem label="Browse" value="browse" />
          <NavItem label="Play!" value="play"/>
        </Navigation>
      <HeaderContent>
        <Logotype />
      </HeaderContent>
    </HeaderWrapper>
  );
}