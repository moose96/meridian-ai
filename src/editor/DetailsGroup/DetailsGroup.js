import React from 'react';

function DetailsGroup({ title, children }) {
  return (
    <div className="details-group">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default DetailsGroup;