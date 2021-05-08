import { Link as MaterialLink, useTheme } from '@material-ui/core';
import { ScrollLink } from 'react-scroll';

import scrollSettings from '../../../constants/scrollSettings';

const MaterialScrollLink = ScrollLink(MaterialLink);

export default function Link({ to, active, onSetActive, children, onClick }) {
  const theme = useTheme();
  const { duration, smooth, offset } = scrollSettings(theme);

  return (
    <MaterialScrollLink
      to={to}
      duration={duration}
      smooth={smooth}
      spy
      offset={offset}
      color={active ? 'primary' : 'textPrimary'}
      style={{ marginRight: '0.5rem', cursor: 'pointer' }}
      onSetActive={onSetActive}
      onClick={onClick}
    >
      {children}
    </MaterialScrollLink>
  );
}
