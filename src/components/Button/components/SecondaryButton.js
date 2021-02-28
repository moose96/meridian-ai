import React from 'react';
import Button from '@material-ui/core/Button';

const SecondaryButton = (props) => <Button variant="text" color="default">{props.children}</Button>;

export default SecondaryButton;