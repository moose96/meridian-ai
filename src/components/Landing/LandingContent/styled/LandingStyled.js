import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const LandingStyled = styled(Box)(({ background }) => ({
  // height: '100%',
  height: 'calc(100vh - 4rem)',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: background?.image
    ? `url('${background.image}')`
    : background?.gradient
    ? background.gradient
    : undefined,
  backgroundSize: 'cover',
  backgroundColor: background?.color,
}));

export default LandingStyled;
