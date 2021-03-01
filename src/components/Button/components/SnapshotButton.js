import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    border: 'none'
  },
  filled: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.action.active
  }
}));

export default function SnapshotButton({ filled, ...props }) {
  const styles = useStyles();

  return <ToggleButton classes={styles} className={filled && styles.filled} {...props} />
}