import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './auth';
// import profile from './profile';
import transaction from './transaction';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['message'],
};

const transactionConfig = {
  key: 'transaction',
  storage: AsyncStorage,
  blacklist: ['message'],
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transaction,
});

export default reducer;
