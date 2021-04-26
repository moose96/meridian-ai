import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ButtonWithTooltip from './ButtonWithTooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '50% 50% 50% 50%',
    aspectRatio: 1,
    background: `linear-gradient(225deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
    color: `${theme.palette.text.icon}`,
  },
}));

const RoundedButton = React.forwardRef((props, ref) => {
  const styles = useStyles();
  return (
    <ButtonWithTooltip
      ref={ref}
      className={styles.root}
      variant="contained"
      {...props}
    />
  );
});

export default RoundedButton;
