import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const MainContainer = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  backgroundColor: `${theme.palette.background.default}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

export default MainContainer;