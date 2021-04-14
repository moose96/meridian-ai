import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const MainContainer = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  backgroundColor: `${theme.palette.background.default}`,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export default MainContainer;
