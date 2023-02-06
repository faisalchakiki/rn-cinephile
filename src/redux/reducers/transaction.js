import {createSlice} from '@reduxjs/toolkit';
import {transactionAction} from '../actions/transactions';

const initialState = {
  dateBooking: null,
  timeBooking: null,
  idMovie: null,
  idCinema: null,
  nameCinema: null,
  price: null,
  logoCinema: null,
  idPayMethod: null,
  seatSelected: null,
};

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    chooseMovie: (state, action) => {
      const {
        idMovie,
        idCinema,
        dateBooking,
        timeBooking,
        nameCinema,
        logoCinema,
        price,
      } = action.payload;
      return (state = {
        ...state,
        ...{
          idMovie,
          idCinema,
          dateBooking,
          timeBooking,
          nameCinema,
          logoCinema,
          price,
        },
      });
    },
    chooseSeats: (state, action) => {
      state.seatSelected = action.payload;
    },
  },
  extraReducers: build => {
    build.addCase(transactionAction.fulfilled, (state, {payload}) => {
      return initialState;
    });
  },
});

export const {chooseMovie, chooseSeats} = transactionReducer.actions;
export default transactionReducer.reducer;
