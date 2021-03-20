import {
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST
} from './types';

export function addToPlaylist(payload) {
  return {
    type: ADD_TO_PLAYLIST,
    payload
  }
}

export function removeFromPlaylist(payload) {
  return {
    type: REMOVE_FROM_PLAYLIST,
    payload
  }
}