import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

const LogotypeText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: ['KoHo', 'Roboto'],
}));

export default LogotypeText;
