import { SET_LANGUAGE } from './types';

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
}
