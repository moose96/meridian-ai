import React from 'react';
import { Tooltip, Button } from '@material-ui/core';

export default function ButtonWithTooltip ({ tooltip, tooltipDisabled, disabled, ...props }) {
  const button = <Button disabled={disabled} {...props} />;

  if (tooltip || tooltipDisabled) {
    if (disabled) {
      return (
        <Tooltip title={tooltipDisabled}>
          <span>
            {button}
          </span>
        </Tooltip>
      );
    }
    return (
      <Tooltip title={tooltip}>
        {button}
      </Tooltip>
    );
  }

  return button;
}