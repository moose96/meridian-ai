import React from 'react';

import DetailsGroup from '../../../../DetailsGroup';
import Filter from './Filter';

function EqualizerView({ data }) {
  const filters = data?.filters;
  console.log(filters);

  return (
    <DetailsGroup title="Equalizer">
      {filters.map((filter, index) => <Filter key={`eq-filter-${index}`} {...filter} />)}
    </DetailsGroup>
  );
}

export default EqualizerView;