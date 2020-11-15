import React from 'react';
import PropTypes from 'prop-types';

import TreeItem from './TreeItem';

function TreeView({ children }) {
  return (
    <div>
      <ul>
        {children}
      </ul>
    </div>
  )
}

TreeView.propTypes = {
  children: PropTypes.instanceOf(TreeItem)
}

export default TreeView;