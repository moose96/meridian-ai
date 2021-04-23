import { SET_DATA } from '../types';

const INITIAL_STATE = {
  data: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DATA:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
}
