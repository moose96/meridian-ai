import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

import { RowBox } from '../../../Box';
import { SecondaryButton } from '../../../Button';
import SoundInfo from '../../../SoundInfo';
import { GuideTooltip } from '../../../Guide';

export default function SoundControls({ playlist, soundInfo }) {
  const portrait = useMediaQuery('(orientation: portrait)');
  const { show, onChange } = playlist;

  const playlistButton = (
    <GuideTooltip frames={['play-playlist-hide']}>
      <SecondaryButton
        tooltip={show ? 'Hide playlist' : 'Show playlist'}
        onClick={() => onChange(!show)}
      >
        {show ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
      </SecondaryButton>
    </GuideTooltip>
  );

  return (
    <RowBox>
      {!portrait ? playlistButton : null}
      <SoundInfo {...soundInfo} onClick={portrait && (() => onChange(!show))} />
    </RowBox>
  );
}
