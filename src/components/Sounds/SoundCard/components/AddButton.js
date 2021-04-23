import React from 'react';
import { Add } from '@material-ui/icons';

import { PrimaryButton } from '../../../Button';

const AddButton = React.forwardRef((props, ref) => {
  return (
    <PrimaryButton ref={ref} {...props}>
      <Add />
      Add to playlist
    </PrimaryButton>
  );
});

export default AddButton;
