import React from 'react';

function Slider(props) {
  return (
    <input type="range" {...props} />
  );
}

export default Slider;