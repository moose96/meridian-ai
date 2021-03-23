import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { Loading } from '../../../../components';
import SoundList from './components/SoundList';
import SoundCategoriesList from './components/SoundCategoriesList';
import { getSets } from '../../../../api/sets';

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSets();
        setSets(data);
        setLoading(false);
      }
      catch(err){
        console.log(err);
      }
    })();
  }, []);

  return (
    <Grid
      container
      direction="row"
      style={{ flex: 1 }}
    >
      <Grid item md={2}>
        <SoundCategoriesList />
      </Grid>
      <Grid item md={10}>
        {loading ?
          <Loading /> :
          <SoundList data={sets}/>}
      </Grid>
    </Grid>
  );
}