import React, { Fragment } from 'react';

import Input from '../Input';
import './Slider.scss';

function Slider(props) {
  // const datalistId = `slider-datalist-${props.name}`;

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
          {/* <datalist id={datalistId} >
            <option value={props.min} label={props.min} style={{left: '0%'}}></option>
            <option value={props.value} label={props.value}></option>
            <option value={props.max} label={props.max} style={{left: '100%'}}></option>
          </datalist> */}
        </Fragment>
      )}
    </Input>
  );
}

export default Slider;