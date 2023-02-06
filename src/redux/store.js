import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';

import reducer from './reducers';

const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});
const persistor = persistStore(store);

export {store, persistor};
