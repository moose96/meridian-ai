const SET_PARAM_VALUE = 'params/SET_PARAM_VALUE';


export function setParamValue(name, value) {
  return {
    type: SET_PARAM_VALUE,
    payload: {
      name,
      value
    }
  }
}

const INITIAL_STATE = {
  volume: 100,
  distance: 0,
  brightness: 0,
  sharpness: 0,
  intensivity: 0,
  width: 60
  //mobility: 0
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_PARAM_VALUE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default:
      return {...state};
  }
}