import { combineReducers } from 'redux';

import soundEngineReducer from '../sound-engine/redux';
import playlistReducer from './playlist';
import guideReducer from './guide';

const reducer = combineReducers({
  soundEngine: soundEngineReducer,
  playlist: playlistReducer,
  guide: guideReducer,
});

export default reducer;
