import { combineReducers } from 'redux';

import soundEngineReducer from '../sound-engine/redux';

const reducer = combineReducers({
  soundEngine: soundEngineReducer
});

export default reducer;