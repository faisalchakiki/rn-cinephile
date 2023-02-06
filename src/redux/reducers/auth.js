import {createSlice} from '@reduxjs/toolkit';
import {loginAction} from '../actions/auth';

const initialState = {
  token: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      return initialState;
    },
  },
  extraReducers: build => {
    build.addCase(loginAction.fulfilled, (state, {payload}) => {
      state.token = payload.token;
    });
  },
});

export const {logout} = authReducer.actions;

export default authReducer.reducer;
