import React from 'react';

import TreeItem from './TreeItem';

function TreeItemGenerator({ data, onClick }) {
  let view;

  const handleClick = id => {
    onClick(id);
  }

  if (Array.isArray(data.source)) {
    view = (
      <TreeItem key={data.id} id={data.id} label={data.name} onClick={handleClick}>
        {data.source.map(element => (
          <TreeItemGenerator key={`tree-item-generator-${element.id}`} data={element} onClick={handleClick}/>
        ))}
      </TreeItem>
    )
  } else {
    view = <TreeItem key={data.id} id={data.id} label={data.name} onClick={handleClick}/>
  }

  return view;
}

export default TreeItemGenerator;