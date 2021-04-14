import React, { useState, useEffect } from 'react';
import { Grid, Paper, Collapse } from '@material-ui/core';

import { Loading, ColumnBox } from '../../../../components';
import { OrientationRoute } from '../../../../containers';
import SoundList from './components/SoundList';
import SoundCategoriesList from './components/SoundCategoriesList';
import SoundListHeader from './components/SoundListHeader';
import { getSets } from '../../../../api/sets';

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSets();
        setSets(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <OrientationRoute
      landscape={
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
              <SoundList
                data={sets}
                header={
                  <SoundListHeader
                    onCategoriesVisibilityChange={() =>
                      setShowCategories(!showCategories)
                    }
                  />
                }
              />
            )}
          </Grid>
        </Grid>
      }
      portrait={
        <ColumnBox>
          <Collapse in={showCategories}>
            <SoundCategoriesList />
          </Collapse>
          {loading ? (
            <Loading />
          ) : (
            <SoundList
              data={sets}
              header={
                <SoundListHeader
                  onCategoriesVisibilityChange={() =>
                    setShowCategories(!showCategories)
                  }
                />
              }
            />
          )}
        </ColumnBox>
      }
    />
  );
}
