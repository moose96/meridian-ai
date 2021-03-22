//DEPRECATED HERE - MOVE TO EDITOR
import React from 'react';
import { Typography, Slider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   thumb: {
//     width: 24,
//     height: 24,
//     marginTop: -12,
//     marginLeft: -12
//   }
// }));

export default function LabelledSlider({ label, ...props }) {
  // const styles = useStyles();

  return (
    <div>
      <Typography color="textPrimary">
        {label}
      </Typography>
      <Slider {...props} />
    </div>
  );
}