import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import {
  SoundCategoriesList,
  Loading,
  SoundListHeader,
} from '../../../../../components';

import SoundList from '../components/SoundList';

export default function BrowseLandscape({ loading, sounds }) {
  return (
    <Grid container direction="row" style={{ flex: 1 }}>
      <Grid item md={2}>
        <Paper style={{ minHeight: '100%' }}>
          <SoundCategoriesList />
        </Paper>
      </Grid>
      <Grid item md={10}>
        {loading ? (
          <Loading />
        ) : (
          <SoundList data={sounds} header={<SoundListHeader />} />
        )}
      </Grid>
    </Grid>
  );
}
