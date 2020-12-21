import React from 'react';
import Slider from '../../../ui/Slider';
import DetailsGroup from '../../DetailsGroup';
import { connect } from 'react-redux';

// import { setGlobalCurve } from '../../../sound-engine/redux';

function GlobalView({ curves, setCurves }) {
  const handleChange = event => {
    const curveID = event.target.name.match(/([1-9])/g);
    setCurves(parseInt(curveID) - 1, event.target.value);
  }

  return (
    <DetailsGroup title="Global parameters">
      {curves && curves.map((curve, index) => (
        <Slider
          key={`global-curve-${index}`}
          name={`curve-${index + 1}`}
          label={`Curve ${index + 1}`}
          min={0}
          max={100}
          step={1}
          value={curve}
          onChange={handleChange} />
      ))}
    </DetailsGroup>
  );
}

const mapStateToProps = state => ({
  curves: state.soundEngine.globalCurves
});

// const mapDispatchToProps = dispatch => ({
//   setCurves: (curve, value) => dispatch(setGlobalCurve(curve, value))
// });

export default GlobalView;