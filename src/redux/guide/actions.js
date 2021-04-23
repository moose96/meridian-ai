import {
  DISABLE_GUIDE,
  ENABLE_GUIDE,
  SET_NEXT_FRAME,
  SET_VISITED,
  RESET_VISITED,
  SET_DATA,
} from './types';

export function enableGuide() {
  return {
    type: ENABLE_GUIDE,
  };
}

export function disableGuide() {
  return {
    type: DISABLE_GUIDE,
  };
}

export function setNextFrame() {
  return {
    type: SET_NEXT_FRAME,
  };
}

export function setVisited() {
  return {
    type: SET_VISITED,
  };
}

export function resetVisited() {
  return {
    type: RESET_VISITED,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    payload: data,
  };
}
