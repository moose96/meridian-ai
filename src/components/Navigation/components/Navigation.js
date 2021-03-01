import React from 'react';
import Tabs from '@material-ui/core/Tabs';

export default function Navigation({ children, ...props }) {
  return(
    <Tabs {...props} indicatorColor="primary" textColor="primary">
      {children}
    </Tabs>
  );
}
