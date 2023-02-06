import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helper/http';

export const transactionAction = createAsyncThunk(
  'transaction/bookingAction',
  async ({
    fullName,
    phoneNumber,
    email,
    timeBooking,
    dateBooking,
    idUsers,
    idMovie,
    idCinema,
    idPayMethod,
    idStatus = 1,
    total,
    seatNum,
    callback,
  }) => {
    try {
      const {data} = await http().post('/bookings', {
        dateBooking,
        timeBooking,
        fullName,
        idUsers,
        phoneNumber,
        idCinema,
        idMovie,
        idStatus,
        total,
        seatNum,
        idPayMethod,
        email,
      });
      callback();
      return data[0];
    } catch (err) {
      console.log('object');
      callback(err);
      throw err;
    }
  },
);
