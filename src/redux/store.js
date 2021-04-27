import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import reducer from './reducer';

const store = createStore(reducer, devToolsEnhancer());
const persistor = persistStore(store);

export { store, persistor };
