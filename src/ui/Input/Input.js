import React from 'react';

import './Input.scss';

function Input({ label, name, ...props }) {
  return (
    <div className="input">
      <div className="input__top-row">
        <label htmlFor={name}>{label}</label>
        <p>{props.value}</p>
      </div>
      <div className="input__bottom-row">
        <p>{props.min}</p>
        <input name={name} {...props} />
        <p>{props.max}</p>
      </div>
    </div>
  )
}

export default Input;