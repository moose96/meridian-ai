import React from 'react';
import { Tooltip, Button } from '@material-ui/core';

export default function ButtonWithTooltip ({ tooltip, tooltipDisabled, disabled, ...props }) {
  const button = <Button disabled={disabled} {...props} />;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {button}
      </Tooltip>
    );
  }

  if (tooltipDisabled && disabled) {
    return (
      <Tooltip title={tooltipDisabled}>
        <span>
          {button}
        </span>
      </Tooltip>
    );
  }

  return button;
}