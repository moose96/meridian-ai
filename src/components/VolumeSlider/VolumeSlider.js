import React from 'react';
import { Grid, Slider } from '@material-ui/core';
import { VolumeUp, VolumeMute } from '@material-ui/icons';

const VolumeSlider = React.forwardRef(
  ({ value, style, onChange, vertical }, ref) => {
    const muteIcon = <VolumeMute color="action" />;
    const upIcon = <VolumeUp color="action" />;
    return (
      <Grid
        container
        spacing={2}
        direction={vertical ? 'column' : 'row'}
        style={style}
      >
        <Grid item align="center">
          {vertical ? upIcon : muteIcon}
        </Grid>
        <Grid item xs>
          <Slider
            ref={ref}
            min={0.0}
            max={1.0}
            step={0.01}
            value={value}
            onChange={onChange}
            orientation={vertical ? 'vertical' : 'horizontal'}
          />
        </Grid>
        <Grid item align="center">
          {vertical ? muteIcon : upIcon}
        </Grid>
      </Grid>
    );
  }
);

export default VolumeSlider;
