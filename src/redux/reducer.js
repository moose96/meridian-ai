import { combineReducers } from 'redux';

import soundEngineReducer from '../sound-engine/redux';
import playlistReducer from './playlist';

const reducer = combineReducers({
  soundEngine: soundEngineReducer,
  playlist: playlistReducer
});

export default reducer;