import { ADD_TO_PLAYLIST, REMOVE_FROM_PLAYLIST } from './types';

const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_TO_PLAYLIST:
      return [
        ...state,
        payload
      ];
    case REMOVE_FROM_PLAYLIST:
      const items = [...state];
      const index = items.findIndex(item => item.id === payload);
      items.splice(index, 1);
      return [...items];
    default:
      return [...state];
  }
}