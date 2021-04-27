import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const HeaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  flex: 1,
}));

export default HeaderContent;
