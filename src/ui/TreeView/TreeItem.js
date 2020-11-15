import React, { useState } from 'react';

function TreeItem({ id, label, children, onClick }) {
  const [rolledUp, setRolledUp] = useState(false);

  const handleClick = () => {
    setRolledUp(!rolledUp);
    onClick(id);
  }

  const style = {
    display: rolledUp ? 'none': 'block'
  }

  return (
    <li>
      <p onClick={handleClick}>{label}</p>
      <ul style={style}>
        {children}
      </ul>
    </li>
  );
}

export default TreeItem;