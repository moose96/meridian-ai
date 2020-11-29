import React from 'react';

import Filter from './Filter';

function EqualizerView({ data }) {
  const filters = data?.filters;

  return (
    <div className="equalizer-view">
      {filters.map(filter => <Filter {...filter} />)}
    </div>
  );
}

export default EqualizerView;