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
      <Grid
        item
        lg={2}
        md={3}
        sm={3}
        xs={4}
        style={guide ? guideStyle : undefined}
      >
        <GuideTooltip frames={['browse-categories']} placement="right">
          <Paper style={{ minHeight: '100%' }}>
            <SoundCategoriesList />
          </Paper>
        </GuideTooltip>
      </Grid>
      <Grid item lg={10} md={9} sm={9} xs={8}>
        {loading ? (
          <Loading />
        ) : (
          <SoundList data={sounds} header={<SoundListHeader />} />
        )}
      </Grid>
    </Grid>
  );
}
