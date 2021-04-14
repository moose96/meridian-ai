import PropTypes from 'prop-types';

import { useOrientation } from '../../hooks';

export default function OrientationRoute({ portrait, landscape, children }) {
  const { orientation } = useOrientation();

  const portraitElement = portrait
    ? portrait
    : children
    ? children.portrait
    : null;
  const landscapeElement = landscape
    ? landscape
    : children
    ? children.landscape
    : null;

  if (orientation === 'portrait') {
    return portraitElement;
  } else if (orientation === 'landscape') {
    return landscapeElement;
  } else {
    return null;
  }
}

OrientationRoute.propTypes = {
  portrait: PropTypes.element,
  landscape: PropTypes.element,
  children: PropTypes.shape({
    portrait: PropTypes.element,
    landscape: PropTypes.landscape,
  }),
};
