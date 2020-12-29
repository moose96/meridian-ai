const SET_PARAM_VALUE = 'params/SET_PARAM_VALUE';


export function setParamValue(name, value) {
  return {
    type: SET_PARAM_VALUE,
    payload: {
      name,
      value,
      gradual: true
    }
  }
}

export function setParamValueImmediately(name, value) {
  return {
    type: SET_PARAM_VALUE,
    payload: {
      name,
      value,
      gradual: false
    }
  }
}

const INITIAL_STATE = {
  volume: 100,
  distance: 0,
  brightness: 0,
  sharpness: 0,
  intensivity: 0,
  width: 60,
  //mobility: 0
  gradual: true
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_PARAM_VALUE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        gradual: action.payload.gradual
      }
    default:
      return {...state};
  }
}