import {
  DISABLE_GUIDE,
  ENABLE_GUIDE,
  SET_NEXT_FRAME,
  RESET_VISITED,
  ADD_VISITED,
  SET_ALL_VISITED,
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

export function resetVisited(data) {
  return {
    type: RESET_VISITED,
    payload: data,
  };
}

export function addVisited(data) {
  return {
    type: ADD_VISITED,
    payload: data,
  };
}

export function setAllVisited(data) {
  return {
    type: SET_ALL_VISITED,
    payload: data,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    payload: data,
  };
}
