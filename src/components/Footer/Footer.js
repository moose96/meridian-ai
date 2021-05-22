import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';

export default function Footer() {
  const theme = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      bgcolor={theme.palette.background.default}
      textAlign="center"
      width="100%"
      paddingY="1rem"
    >
      <Typography color="textPrimary">
        Copyright &copy; {currentYear} by Piotr Łosiak and Tomasz Żołnierczyk
      </Typography>
    </Box>
  );
}
