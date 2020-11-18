import React, { Fragment } from 'react';

import Input from '../Input';

function Number(props) {
  return (
    <Input type="number" {...props}>
      {(labelComponent, inputComponent) => (
        <Fragment>
          {labelComponent}
          <div className="input__bottom-row">
            <p>{props.min}</p>
            {inputComponent}
            <p>{props.max ? props.max : 'inf'}</p>
          </div>
        </Fragment>
      )}
    </Input>
  )
}

export default Number;