import React from 'react';
import { Tooltip, Button } from '@material-ui/core';

const ButtonWithTooltip = React.forwardRef(
  ({ tooltip, tooltipDisabled, disabled, ...props }, ref) => {
    const button = <Button ref={ref} disabled={disabled} {...props} />;

    if (tooltip) {
      return <Tooltip title={tooltip}>{button}</Tooltip>;
    }

    if (tooltipDisabled && disabled) {
      return (
        <Tooltip title={tooltipDisabled}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  }
);

export default ButtonWithTooltip;
