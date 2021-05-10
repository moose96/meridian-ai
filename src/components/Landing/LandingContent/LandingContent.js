import React, { useMemo } from 'react';
import { Element } from 'react-scroll';

import LandingStyled from './styled/LandingStyled';
import LandingShapedContent from './components/LandingShapedContent';
import LandingBackgroundImage from './components/LandingBackgroundImage';
import LandingAnimated from './components/LandingAnimated';

/* background: image, color, gradient, animated, cssImage */

const LandingContent = React.forwardRef(
  ({ background, children, id, ...props }, ref) => {
    const styledBackground = useMemo(
      () =>
        background
          ? {
              ...background,
              image: !background.animated ? background.image : undefined,
            }
          : undefined,
      [background]
    );

    return (
      <Element name={id}>
        <LandingStyled ref={ref} background={styledBackground} {...props}>
          {background?.animated ? (
            <LandingBackgroundImage
              src={background?.image}
              filter={background?.darken ? 'brightness(0.6)' : undefined}
            />
          ) : null}
          {children}
        </LandingStyled>
      </Element>
    );
  }
);

LandingContent.Shaped = LandingShapedContent;
LandingContent.Animated = LandingAnimated;

export default LandingContent;
