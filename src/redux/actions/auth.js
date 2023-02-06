import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helper/http';

export const loginAction = createAsyncThunk(
  'auth/loginAsync',
  async ({email, password, cb}) => {
    try {
      const {data} = await http().post('/auth/login', {
        email,
        password,
      });
      cb();
      return data.results;
    } catch (err) {
      cb(err);
      throw err;
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/registerAsync',
  async ({email, password, firstName, lastName, phoneNumber, callback}) => {
    try {
      const {data} = await http().post('/users', {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });
      callback();
      return data[0];
    } catch (err) {
      callback(err);
      throw err;
    }
  },
);
