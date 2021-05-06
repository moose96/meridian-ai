import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1)}px 0`,
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  height: '3.5rem',
}));

export default HeaderWrapper;
