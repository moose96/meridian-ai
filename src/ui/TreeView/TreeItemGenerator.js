import React from 'react';

import TreeItem from './TreeItem';
import SoundEngineObject from '../../sound-engine/base/SoundEngineObject';

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
  } else if (data.source instanceof SoundEngineObject) {
    view = (
      <TreeItem key={data.id} id={data.id} label={data.name} onClick={handleClick}>
        <TreeItemGenerator key={`tree-item-generator-${data.source.id}`} data={data.source} onClick={handleClick} />
      </TreeItem>
    )

  } else {
    view = <TreeItem key={data.id} id={data.id} label={data.name} onClick={handleClick}/>
  }

  return view;
}

export default TreeItemGenerator;