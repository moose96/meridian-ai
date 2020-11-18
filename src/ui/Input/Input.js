import React, { Fragment } from 'react';

import './Input.scss';

function Input({ className, label, name, children, ...props }) {
  const labelComponent = <label htmlFor={name}>{label}:</label>;
  const inputComponent = <input name={name} {...props} />;

  return (
    <div className={`input ${className}`}>
      {children ?
        children(labelComponent, inputComponent) : (
        <Fragment>
          {labelComponent}
          {inputComponent}
        </Fragment>
      )}
    </div>
  )
}

export default Input;