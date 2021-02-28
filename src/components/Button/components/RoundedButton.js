import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '50% 50% 50% 50%',
    aspectRatio: 1,
    borderWidth: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function RoundedButton(props) {
  const styles = useStyles();
  return <Button className={styles.root} variant="outlined" {...props} />;
}