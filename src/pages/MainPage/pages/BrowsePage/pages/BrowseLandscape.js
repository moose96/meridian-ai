import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import {
  SoundCategoriesList,
  Loading,
  SoundListHeader,
  GuideTooltip,
} from '../../../../../components';
import { useGuide } from '../../../../../hooks';

import SoundList from '../components/SoundList';

export default function BrowseLandscape({ loading, sounds }) {
  const { guide, style: guideStyle } = useGuide(['browse-categories']);
  return (
    <Grid container direction="row" style={{ flex: 1 }}>
      <Grid item md={2} style={guide ? guideStyle : undefined}>
        <GuideTooltip frames={['browse-categories']} placement="right">
          <Paper style={{ minHeight: '100%' }}>
            <SoundCategoriesList />
          </Paper>
        </GuideTooltip>
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
