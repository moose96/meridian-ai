import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '50% 50% 50% 50%',
    aspectRatio: 1,
    background: `linear-gradient(225deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
    color: `${theme.palette.text.icon}`
  }
}));

export default function RoundedButton(props) {
  const styles = useStyles();
  return <Button className={styles.root} variant="contained" {...props} />;
}