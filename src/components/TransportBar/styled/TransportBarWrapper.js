import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const TransportBarWrapepr = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.background.paper}`,
  padding: `${theme.spacing(2)}px 0`
}));

export default TransportBarWrapepr;