import React, { useState, useEffect } from 'react';

import { OrientationRoute } from '../../../../containers';
import { getSets } from '../../../../api/sets';

import BrowseLandscape from './pages/BrowseLandscape';
import BrowsePortrait from './pages/BrowsePortrait';

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState([]);

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
      landscape={<BrowseLandscape loading={loading} sounds={sets} />}
      portrait={<BrowsePortrait loading={loading} sounds={sets} />}
    />
  );
}
