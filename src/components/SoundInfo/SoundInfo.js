import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';

import SoundInfoContainer from './styled/SoundInfoContainer';

export default function SoundInfo({ cover, title, onClick }) {
  const theme = useTheme();
  const portrait = useMediaQuery('(orientation: portrait)');
  const tooSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (title) {
    return (
      <SoundInfoContainer>
        <div
          style={{
            height: '4rem',
            width: '4rem',
            marginRight: '1rem',
          }}
          onClick={handleClick}
        >
          <img
            src={cover}
            alt="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {!portrait && !tooSmall && (
          <Typography variant="h6" color="textPrimary" onClick={handleClick}>
            {title}
          </Typography>
        )}
      </SoundInfoContainer>
    );
  }

  return null;
}
