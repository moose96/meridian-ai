const SET_CURRENT_VOICES = 'voices/SET_CURRENT_VOICES';
const ADD_CURRENT_VOICES = 'voices/ADD_CURRENT_VOICES';
const SUB_CURRENT_VOICES = 'voices/SUB_CURRENT_VOICES';
const SET_GLOBAL_CURVE = 'global/SET_GLOBAL_CURVE';

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

export function setGlobalCurve(curve, value) {
  return {
    type: SET_GLOBAL_CURVE,
    payload: {
      curve,
      value
    }
  }
}

const INITIAL_STATE = {
  voices: 0,
  globalCurves: [0, 0, 0, 0]
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
    case SET_GLOBAL_CURVE: {
      let curves = state.globalCurves;
      curves[action.payload.curve] = action.payload.value;

      return {
        ...state,
        globalCurves: [...curves]
      }
    }
    default:
      return {...state};
  }
}