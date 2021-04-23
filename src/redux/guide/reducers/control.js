import {
  DISABLE_GUIDE,
  ENABLE_GUIDE,
  RESET_VISITED,
  SET_NEXT_FRAME,
  SET_VISITED,
} from '../types';

const INITIAL_STATE = {
  guideMode: false,
  currentFrame: 0,
  visited: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type } = action;

  switch (type) {
    case ENABLE_GUIDE:
      return {
        ...state,
        guideMode: true,
      };
    case DISABLE_GUIDE:
      return {
        ...state,
        guideMode: false,
      };
    case SET_NEXT_FRAME:
      return {
        ...state,
        currentFrame: state.currentFrame + 1,
      };
    case SET_VISITED:
      return {
        ...state,
        visited: true,
        currentFrame: 0,
        guideMode: false,
      };
    case RESET_VISITED:
      return {
        ...state,
        visited: false,
      };
    default:
      return state;
  }
}
