import React, { Fragment } from 'react';

import Input from '../Input';
import './Slider.scss';

function Slider(props) {
  return (
    <Input className="slider" type="range" {...props}>
      {(labelComponent, inputComponent) => (
        <Fragment>
          <div className="slider__top-row">
            {labelComponent}
            <p>{props.value}</p>
          </div>
          <div className="slider__bottom-row">
            <p>{props.min}</p>
            {inputComponent}
            <p>{props.max}</p>
          </div>
        </Fragment>
      )}
    </Input>
  );
}

export default Slider;