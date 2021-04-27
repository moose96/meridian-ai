import {
  DISABLE_GUIDE,
  ENABLE_GUIDE,
  RESET_VISITED,
  ADD_VISITED,
  SET_ALL_VISITED,
  SET_NEXT_FRAME,
} from '../types';

const INITIAL_STATE = {
  guideMode: false,
  currentFrame: 0,
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
    case RESET_VISITED:
      return {
        ...state,
        visitedRoutes: [
          ...state.visitedRoutes.slice(0, state.visitedRoutes.indexOf(payload)),
          ...state.visitedRoutes.slice(
            state.visitedRoutes.indexOf(payload) + 1
          ),
        ],
      };
    case ADD_VISITED:
      return {
        ...state,
        currentFrame: 0,
        guideMode: false,
        visitedRoutes: [...state.visitedRoutes, payload],
      };
    case SET_ALL_VISITED:
      return {
        ...state,
        visitedRoutes: payload,
        currentFrame: 0,
        guideMode: false,
      };
    default:
      return state;
  }
}
