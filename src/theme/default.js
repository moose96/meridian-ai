import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: purple[400]
    }
  }
});

export default theme;