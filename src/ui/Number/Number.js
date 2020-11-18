import React, { Fragment } from 'react';

import Input from '../Input';
import './Number.scss';

function Number(props) {
  return (
    <Input className="number" type="number" {...props}>
      {(labelComponent, inputComponent) => (
        <Fragment>
          {labelComponent}
          <div className="number__bottom-row">
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