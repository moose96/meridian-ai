import React, { useState } from 'react';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function TreeItem({ id, label, children, onClick }) {
  const [rolledUp, setRolledUp] = useState(false);

  const handleLabelClick = () => {
    onClick(id);
  }

  const handleIconClick = () => {
    setRolledUp(!rolledUp);
  }

  let icon;

  if (children) {
    if (!rolledUp) {
      icon = <ArrowDropDownIcon onClick={handleIconClick}/>
    } else {
      icon = <ArrowRightIcon onClick={handleIconClick}/>
    }
  }

  const style = {
    display: rolledUp ? 'none': 'block'
  }

  return (
    <li style={!children ? {paddingLeft: '30px'} : null}>
      <p>
        {icon}
        <span onClick={handleLabelClick}>{label}</span>
      </p>
      <ul style={style}>
        {children}
      </ul>
    </li>
  );
}

export default TreeItem;