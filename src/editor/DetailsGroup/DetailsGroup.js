import React from 'react';

import './DetailsGroup.scss';

function DetailsGroup({ title, children }) {
  return (
    <div className="details-group">
      <div className="details-group__header">
        <h3>{title}</h3>
      </div>
      <div className="details-group__content">
        {children}
      </div>
    </div>
  )
}

export default DetailsGroup;