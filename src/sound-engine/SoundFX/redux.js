const SET_CURVES = 'curves/SET_CURVES';
const SET_CURVE_VALUE = 'curves/SET_CURVE_VALUE';

export function setCurves(id) {
  const defaultCurves = {
    volume: 0,
    distance: 0,
    brightness: 0,
    sharpness: 0
  };

  return {
    type: SET_CURVES,
    payload: {
      id,
      curves: defaultCurves
    }
  }
}

export function setCurveValue(id, curve, value) {
  return {
    type: SET_CURVE_VALUE,
    payload: {
      id,
      curve,
      value
    }
  }
}

const INITIAL_STATE = {
  curves: []
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_CURVES:
      return {
        ...state,
        curves: [...state.curves, action.payload]
      }
    case SET_CURVE_VALUE: {
      let curves = [...state.curves];
      let sound = curves.find(curve => curve.id === action.payload.id);
      sound.curves[action.payload.curve] = action.payload.value;

      return {
        ...state,
        curves: [...curves]
      }
    }
    default:
      return {...state};
  }
}