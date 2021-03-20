import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import SoundList from './components/SoundList';
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
    <div>
      {loading ?
        <CircularProgress /> :
        <SoundList data={sets}/>}
    </div>
  );
}