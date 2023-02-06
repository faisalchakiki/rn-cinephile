import React from 'react';
import {Provider} from 'react-redux';
import Main from './src/screens/Main';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
