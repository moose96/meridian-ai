import { combineReducers } from 'redux';

import { controlReducer, dataReducer } from './reducers';

export default combineReducers({
  control: controlReducer,
  data: dataReducer,
});
