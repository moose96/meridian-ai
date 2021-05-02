import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import soundEngineReducer from '../sound-engine/redux';
import playlistReducer from './playlist';
import guideReducer from './guide';
import settingsReducer from './settings';

const guidePersistOptions = {
  key: 'guide',
  storage,
  whitelist: ['control'],
};

const settingsPersistOptions = {
  key: 'settings',
  storage,
};

const reducer = combineReducers({
  soundEngine: soundEngineReducer,
  playlist: playlistReducer,
  guide: persistReducer(guidePersistOptions, guideReducer),
  settings: persistReducer(settingsPersistOptions, settingsReducer),
});

export default reducer;
