import React from 'react';

import DetailsGroup from '../../../../DetailsGroup';
import Filter from './Filter';

function EqualizerView({ data }) {
  const filters = data?.filters;

  return (
    <DetailsGroup title="Equalizer">
      {filters.map(filter => <Filter {...filter} />)}
    </DetailsGroup>
  );
}

export default EqualizerView;