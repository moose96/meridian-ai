import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const GuideContainer = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 100,
});

export default GuideContainer;
