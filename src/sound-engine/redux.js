const SET_CURRENT_VOICES = 'voices/SET_CURRENT_VOICES';
const ADD_CURRENT_VOICES = 'voices/ADD_CURRENT_VOICES';
const SUB_CURRENT_VOICES = 'voices/SUB_CURRENT_VOICES';

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

const INITIAL_STATE = {
  voices: 0
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
    default:
      return {...state};
  }
}