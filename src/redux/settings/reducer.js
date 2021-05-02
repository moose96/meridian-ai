import { SET_LANGUAGE } from './types';

const INITIAL_STATE = {
  language: 'en',
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
}
