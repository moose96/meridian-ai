import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from '@material-ui/core';
import { browserName } from 'react-device-detect';

import { PrimaryButton } from '../../Button';

export default function BrowserNotSupported({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nieobsługiwana przeglądarka</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography color="textPrimary">
            Uprzejmie przepraszamy za niedogodności, ale przeglądarka{' '}
            {browserName} jest nieobsługiwana przez tą aplikację. Proszę użyj
            jednej z poniższych przeglądarek: <strong>Google Chrome</strong>,{' '}
            <strong>Microsoft Edge</strong>, <strong>Opera</strong>,{' '}
            <strong>Mozilla Firefox</strong>.
          </Typography>
          <Typography color="textPrimary">
            W przypadku używania Firefox'a upewnij się, że nie używasz trybu
            incognito oraz, że masz włączoną obsługę ciasteczek.
          </Typography>
        </DialogContentText>
        <DialogActions>
          <PrimaryButton onClick={onClose}>OK</PrimaryButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
