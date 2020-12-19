const SET_CURRENT_VOICES = 'voices/SET_CURRENT_VOICES';
const ADD_CURRENT_VOICES = 'voices/ADD_CURRENT_VOICES';
const SUB_CURRENT_VOICES = 'voices/SUB_CURRENT_VOICES';

const SET_CURVES = 'curves/SET_CURVES';
const SET_CURVE_VALUE = 'curves/SET_CURVE_VALUE';

export function setCurrentVoices(voices) {
  return {
    type: SET_CURRENT_VOICES,
    payload: voices
  }
}

export function addCurrentVoices() {
  return {
    type: ADD_CURRENT_VOICES
  }
}
export function subCurrentVoices() {
  return {
    type: SUB_CURRENT_VOICES
  }
}

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
  voices: 0,
  curves: []
}

export default function reducer (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_VOICES:
      return {
        ...state,
        voices: action.payload
      }
    case ADD_CURRENT_VOICES:
      return {
        ...state,
        voices: state.voices + 1
      }
    case SUB_CURRENT_VOICES:
      return {
        ...state,
        voices: state.voices - 1
      }
    case SET_CURVES:
      return {
        ...state,
        curves: [...state.curves, action.payload]
      }
    case SET_CURVE_VALUE: {
      let curves = {...state.curves};
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