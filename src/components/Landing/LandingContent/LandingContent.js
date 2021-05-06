import React from 'react';

import LandingStyled from './styled/LandingStyled';
import LandingShapedContent from './components/LandingShapedContent';
import LandingBackgroundImage from './components/LandingBackgroundImage';

/* background: image, color, gradient, animated, cssImage */

const LandingContent = React.forwardRef(
  ({ background, children, ...props }, ref) => {
    const styledBackground = background
      ? {
          ...background,
          image: !background.animated ? background.image : undefined,
        }
      : undefined;

    return (
      <LandingStyled ref={ref} background={styledBackground} {...props}>
        {background?.animated ? (
          <LandingBackgroundImage
            src={background?.image}
            filter={background?.darken ? 'brightness(0.6)' : undefined}
          />
        ) : null}
        {children}
      </LandingStyled>
    );
  }
);

LandingContent.Shaped = LandingShapedContent;

export default LandingContent;
