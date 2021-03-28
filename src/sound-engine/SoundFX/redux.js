const SET_PARAM_VALUE = 'params/SET_PARAM_VALUE';
const SET_TIME = 'params/SET_TIME';

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

export function setTime(time) {
  return {
    type: SET_TIME,
    payload: time
  }
}

const INITIAL_STATE = {
  params: {
    volume: 100,
    distance: 50,
    brightness: 44,
    sharpness: 44,
    intensivity: 0,
    width: 60,
    //TODO:
    //mobility: 0
  },
  settings: {
    gradual: true,
    time: 5000
  }
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_PARAM_VALUE:
      return {
        ...state,
        params: {
          ...state.params,
          [action.payload.name]: action.payload.value,
        },
        settings: {
          ...state.settings,
          gradual: action.payload.gradual
        }
      }
    case SET_TIME:
      return {
        ...state,
        settings: {
          ...state.settings,
          time: action.payload
        }
      }
    default:
      return {...state};
  }
}