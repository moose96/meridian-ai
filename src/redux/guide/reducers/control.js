import {
  DISABLE_GUIDE,
  ENABLE_GUIDE,
  RESET_VISITED,
  ADD_VISITED,
  SET_NEXT_FRAME,
  SET_VISITED,
} from '../types';

const INITIAL_STATE = {
  guideMode: false,
  currentFrame: 0,
  visited: false,
  visitedRoutes: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

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
    case ADD_VISITED:
      return {
        ...state,
        visited: true,
        currentFrame: 0,
        guideMode: false,
        visitedRoutes: [...state.visitedRoutes, payload],
      };
    default:
      return state;
  }
}
