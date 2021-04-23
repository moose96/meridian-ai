import React from 'react';
import Tabs from '@material-ui/core/Tabs';

const Navigation = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Tabs ref={ref} {...props} indicatorColor="primary" textColor="primary">
      {children}
    </Tabs>
  );
});

export default Navigation;
